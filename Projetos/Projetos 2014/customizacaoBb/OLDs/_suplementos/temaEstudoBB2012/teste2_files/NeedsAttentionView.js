
/**
 * A view that displays notifications that an instructor needs to pay attention to.
 */
var NeedsAttentionView = Class.create(NautilusView, {

  initialize: function($super, courseId, groupId, containerId, parentId, sources, eventGroups, equivalentEvents,
		  				viewOptions, genericBlocks, renderAllNotificationItems )
  {
    if (genericBlocks)
    {
      this.genericBlocks = [genericBlocks].flatten();
    }

    $super(courseId, groupId, sources, containerId, parentId, viewOptions, renderAllNotificationItems );

    // the events we're supposed to display in this view
    this.sources = sources;

    // defines events types that should be grouped together in the view
    this.eventGroups = eventGroups;

    // defines events that are equivalent to one another
    this.equivalentEvents = equivalentEvents;


    // set up a custom notification renderer
    this.setActorRenderer(function (notification, actor, menu) {

      var item = this.defaultActorRenderer(notification, actor, menu);

      // determine whether this notification represents a late submission
      var late = notification.sourceType == "AS" && ["AS_LATE_ATTEMPT", "AS_GA_LATE_ATTEMPT"].include(notification.eventType) ||
                 notification.sourceType == "TE" && notification.eventType == "TE_SUBMIT_LATE";

      // if late, add an indicator to the notification
      if (late) {
        item.appendChild(Builder.node("span", {className: "flag late"}, notification_controller.getResource("nautilus.view.lateSubmission") ));
      }

      return item;

    }.bind(this));

  },

  buildView: function() {

    var viewDiv = Builder.node("div", {className: "portletBlock"});

    // get a list of all supported events that have associated notifications
    var events = notification_controller.getEvents(nautilus_utils.flattenEventMap(this.sources));

    var blocks = [];

    // group the events under the appropriate headers
    var eventGroups = this.groupEvents(events);

    // create a block for each event group
    eventGroups.each( function(pair) {

      // the root event under which this group is organized
      var event = pair.key;

      // the grouped events
      var group = pair.value;

      // parse the event key into source and event
      var keyBits = notification_controller.parseEventKey(event);

      // grab the translated name of the event
      var eventTitle = notification_controller.getEventTitle(keyBits[0], keyBits[1]);

      // get all notifications for all events in this group
      var notifications = group.collect(function(groupEvent) {
        return notification_controller.getNotificationsByEvent(groupEvent);
      }).flatten();

      // if there are any notifications to display for this group
      if (notifications) {

        var equivalenceGrouping = {};

        // loop through the list of notifications, rejecting the ones in which the
        // user is *not* a receiver, and consolidating all "on time" and "late"
        // events into the same notification
        notifications = notifications.reject(function(item) {

          // immediately reject all sender notifications
          if (item.recipientType == notification_controller.RECIPIENT_SENDER) {
            return true;
          }

          else {

            // grab the key that establishes the equivalence between the "late" and "on-time"
            // versions of the same event
            var key = this.getEquivalenceKey(item);

            // look for a notification that we've already processed for this equivalence key
            var notification = equivalenceGrouping[key];

            // if we find one, simply add the internal id of the current notification to the
            // existing notification's definition; do *not* add the current notification
            // to the list
            if (notification) {
              notification.notificationIds.push(item.notificationIds[0]);
              notification.recipientCount += item.recipientCount;
              return true;
            }

            // haven't run across a notification with this key yet; add it to the list
            else {
              equivalenceGrouping[key] = item;
              return false;
            }
          }

        }.bind(this));

        // sort notifications by name
        notifications.sort(function(a, b) { return nautilus_utils.attributeComparator(a, b, "title"); });

        // if any of the above notification is rejected, do not display
        if (notifications.length > 0) {
          var block = new nautilus_utils.NotificationBlock(event,
                                                           eventTitle,
                                                           notifications,
                                                           false,
                                                           notification_controller.RECIPIENT_SENDER,
                                                           keyBits[0] != "SU",
                                                           true );
          blocks.push(block);
        }

      }

    }.bind(this));

    // now add the generic blocks in
    if (this.genericBlocks) {

      // add all generic blocks to the block list, along with an entry for each in the
      // view filter
      this.genericBlocks.each(function (block) {
        blocks.push(block);
      });

    }

    var view = this.renderNotificationView(blocks, true);
    viewDiv.appendChild(view);

    // add the whole thing to our parent container
    $(this.parentId).appendChild(viewDiv);

  },

  /**
   * Override the basic actor removal functionality to account for the basic oddness of the Needs
   * Attention view -- although we're essentially displaying SENDER records for the actors (where
   * the senders are the ones who issued the notifications that requires the instructor's
   * attention), what we really want to remove are the RECEIVER records that are calling the
   * current user's attention to the item in the first place.
   *
   * So, instead of removing the recipient represented by the actor in the view, remove the
   * recipient for the current user (and the same notification).
   *
   * @param actorId  The id of the actor to remove
   */
  removeActor: function(actorId) {
    var actor = notification_controller.actors.get(actorId);
    notification_controller.removeActorForUser(actor.eudItemId, actorId);
  },


  /**
   * Display an actor count after the notification title, if we're showing actors
   *
   * @param notification  The notification we're rendering
   * @param displayActors Whether this notification has associated actors
   */
  getNotificationTitleDecorator: function(notification, displayActors) {

    if ( displayActors )
    {
      return Builder.node("span", "(" + notification.recipientCount + ")");
    }
    else
    {
      return null;
    }

  },

  /**
   * Generate a key that establishes the equivalence between "late" and "on-time" versions of
   * a notification event for the same item
   *
   * @param notification
   */
  getEquivalenceKey: function(notification) {

    // translate "late" event types to their corresponding "on time" event types; this is
    // how we normalize late and on-time events into the same bucket
    var eventId = this.equivalentEvents[notification.sourceType + "::" + notification.eventType];

    return notification.parentId + "::" +
           notification.courseId + "::" +
           notification.courseContentId + "::" +
           notification.sourceType + "::" +
           (eventId ? eventId : notification.eventType);

  },

  /**
   * Groups the given list of events according to the standard grouping
   *
   * @param events The events to group.
   */
  groupEvents: function(events) {

    var eventGroups = $H();

    $H(this.eventGroups).each(function(pair) {

      var event = pair.key;
      var group = pair.value;

      group.each(function (groupEvent) {
        if (events.indexOf(groupEvent) != -1) {
          if (!eventGroups.get(event))
          {
            eventGroups.set(event, []);
          }
          eventGroups.get(event).push(groupEvent);
        }
      });
    });

    return eventGroups;

  }

});

