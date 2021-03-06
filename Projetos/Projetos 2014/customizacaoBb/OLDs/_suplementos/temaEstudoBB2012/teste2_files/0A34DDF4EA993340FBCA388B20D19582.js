/**
 * A set of utility functions for nautilus views.
 */
if (!window.nautilus_utils) {

var nautilus_utils = window.nautilus_utils = {

  /**
   * Toggles the display of the actors associated with the given notification.
   *
   * @param viewId          The view where the actors should be displayed
   * @param notificationId  The notification they're associated with
   */
  toggleActors : function(viewId, notificationId, blockId) {
    var view = notification_controller.notificationContainers[viewId];
    view.toggleActorContainer(notificationId, blockId);
  },

  /**
   * Toggles the display of the actors associated with the given notification.
   *
   * @param viewId          The view where the actors should be displayed
   * @param notificationId  The notification they're associated with
   */
  toggleGenericBlockActors : function(blockId, notificationId) {
    $H(notification_controller.notificationContainers).values().each(function(container) {
      if (container instanceof WhatsNewView) {
        container.toggleGenericBlockActorContainer(blockId, notificationId);
      }
    });

  },

  toggleBlock: function(viewId, blockId) {
    var view = notification_controller.notificationContainers[viewId];
    view.toggleBlock(blockId);
  },

  clearBlockNotifications: function(viewId, blockId, confirmationMsg) {
    if (confirm(confirmationMsg)) {
      notification_controller.clearNotifications(viewId,blockId);
    }
  },

  clearAllNotifications: function(viewId, confirmationMsg) {
    if (confirm(confirmationMsg)) {
      notification_controller.clearNotifications(viewId, null);
    }
  },

  displayNotificationActionMenu: function(viewId, notificationId, displayRemove, pos) {
    var view = notification_controller.notificationContainers[viewId];
    view.displayNotificationActionMenu(notificationId, displayRemove, pos);
  },

  displayActorActionMenu: function(viewId, actor, pos) {
    var view = notification_controller.notificationContainers[viewId];
    view.displayActorActionMenu(actor, pos);
  },

  actionSelected: function(notificationId, actionKey, defaultAction, menuId) {
    notification_controller.handleNotificationAction(notificationId, actionKey, defaultAction);
    if (menuId)
    {
      $(menuId).hide();
    }
  },

  actorActionSelected: function(actorId, actionKey, menuId) {
    notification_controller.handleActorAction(actorId, actionKey);
    $(menuId).hide();
  },

  // TODO: rename this to indicate that it operates on *actors*, not notifications
  removeNotification: function(notificationViewId, menuId) {
    notification_controller.removeNotification(notificationViewId);
    $(menuId).hide();
  },

  removeNotifications: function(notificationViewId, menuId) {
    notification_controller.removeNotifications(notificationViewId);
    $(menuId).hide();
  },

  refreshNotifications: function(notificationViewId) {
    notification_controller.refreshNotifications(notificationViewId);
  },

  removeActor: function(viewId, actorId, menuId) {
    var view = notification_controller.notificationContainers[viewId];
    view.removeActor(actorId);
    $(menuId).hide();
  },

  removeNotificationActorsForUser: function(notificationViewId, menuId) {
    notification_controller.removeNotificationActorsForUser(notificationViewId);
    $(menuId).hide();
  },

  onCloseLinkClick: function( event )
  {
    $("menuDiv").setStyle({display: "none"});
  },


  /**
   * Displays the given action menu, positioning it relative to the given
   * menu button.
   *
   * @param buttonId The button that invokes the action menu
   * @param menuId   The menu itself
   */
  displayActionMenu: function(buttonId, menuId) {

    var parentButton = $(buttonId);
    var menu = $(menuId);

    menu.setStyle( {display: "block"} );

    var buttonPos = parentButton.cumulativeOffset();
    var buttonDimensions = parentButton.getDimensions();

    var verticalOffset   = Prototype.Browser.IE ? 2 : 1;
    var horizontalOffset = Prototype.Browser.IE ? 3 : 2;

    var bodyWidth = $(document.body).getWidth();
    var menuWidth = menu.down().getWidth();

    var overbounds = page.util.isRTL() ?
      buttonPos[0] + parentButton.getWidth() - menuWidth < 0 : buttonPos[0] + menuWidth > bodyWidth;

    // if we're in right-to-left locale, or we're right up against the right edge of
    // the browser, orient the menu leftwards
    if ( (page.util.isRTL() && !overbounds) || (!page.util.isRTL() && overbounds) ) {
      buttonPos[0] = (buttonPos[0] - menuWidth + parentButton.getWidth() + horizontalOffset);
    }

    // otherwise we're left-to-right, or butting up against the far left edge of the browser
    else {
      buttonPos[0] = (buttonPos[0] + horizontalOffset);
    }

    // position the menu below the parent action button
    menu.style.top = (buttonPos[1] + buttonDimensions.height + verticalOffset) + "px";
    menu.style.left = buttonPos[0] + "px";
    menu.down("li > a").focus();

    menu.down("li > a").focus();
  },



  // ================= Asynchronous Loads of Nautilus View Framework

  // This section contains functions that support the asynchronous load of everything necessary
  // to the get the Nautilus view framework up and running. It is useful if you have a situation
  // where the pages containing the views are themselves loaded asynchronously. In fact, it was
  // written with the assmption that they *would* be loaded asynchronously; however, this does not
  // appear to be the case. We're keeping this stuff around on the off-chance that we might need
  // it later.



  // status codes for nautilus initialization
  INIT_NOT_STARTED : 1,
  INIT_IN_PROGRESS : 2,
  INIT_COMPLETE    : 3,

  // the current initialization status
  status : null,

  /**
   * Load up all the support javascript object necessary for Nautilus's execution, then initialize
   * the model. Callers pass in a function to invoke when the initialization is complete.
   *
   * @param callback The function to call when the initialization is complete.
   */
  initNautilus : function(callback) {

    this._callOnCompletion(callback);

    // if we haven't been initialized yet
    if (!this.status || this.status == this.INIT_NOT_STARTED) {

      this.status = this.INIT_IN_PROGRESS;

      // first, pull down the dwr interface to our backend nautilus service; note the
      // little bit of hackery occurring here: because the NautilusViewService object
      // is declared using standard function syntax, it is *not* placed in the global
      // namespace -- due to the exigencies of scope; so we put it there ourselves
      new Ajax.Request("/webapps/blackboard/dwr/interface/NautilusViewService.js", {
        asynchronous: false,
        onSuccess: function(transport){
          eval(transport.responseText);
          window.NautilusViewService = NautilusViewService;
        }
      });

      // now load the rest of the stuff we need
      ["/webapps/blackboard/nautilus/notification_controller.js", "/webapps/blackboard/nautilus/views/NautilusView.js"].each(function(script){
        new Ajax.Request(script, {
          asynchronous: false
        });
      });

      // initialize the model, after pulling back the id of the current user
      NautilusViewService.getUserId(function(id){
        notification_controller.initNotifications();
      });

      this.status = this.INIT_COMPLETE;

    }

  },


  /**
   * If nautilus is already initialized; just invokes the callback immeidately; otherwise
   * sleep for a bit and checks again.
   *
   * @param callback The function to call when init is complete
   */
  _callOnCompletion : function(callback) {

    if (this.status == this.INIT_COMPLETE) {
      callback.apply();
    }

    else {
      setTimeout(function() {
        nautilus_utils._callOnCompletion(callback);
      }, 300);
    }
  },

  renderNotificationBlockFromExceedItem: function(viewId, blockId) {
    var view = notification_controller.notificationContainers[viewId];
    view.renderNotificationBlockFromExceedItem(viewId, blockId);
  },


  /**
   * Compares the given attribute in the given objects. Returns -1
   * if a < b, 1 if a > b, or 0 if they're equal
   *
   * @param a          The first object to compare
   * @param b          The second object to compare
   * @param attribute  The attribute to compare in both objects
   */
  attributeComparator: function(a, b, attribute) {

    var attribA = a[attribute];
    var attribB = b[attribute];

    if (attribA < attribB)
    {
      return -1;
    }
    else if (attribA > attribB)
    {
      return 1;
    }
    else
    {
      return 0;
    }
  },


  /**
   * Given a hash in the format [source type] => [event type], returns an array
   * of flattened, fully-qualified event names in the format
   * [source type]::[event type]
   *
   * @param  The event map
   * @return A flattened array of fully-qualfied event names
   */
  flattenEventMap: function(eventMap) {

    var events = $A();

    // flatten the supported events into fully-qualified event names
    $H(eventMap).each(function(mapEntry) {

      var source = mapEntry.key;

      // prepend the source key to each event name, then add the combined
      // id to the list
      mapEntry.value.each(function(event) {
        this.push(source + "::" + event);
      }, this);

    }, events);

    return events;

  }

};



/**
 * Encapsulates details of a notification "block": its unique key,
 * its translated name, and the notifications it contains.
 */
nautilus_utils.NotificationBlock = Class.create();

/**
 * A representation of a single block in nautilus view.
 *
 * @param id                 The id of the block
 * @param name               The title of the block
 * @param notifications      The notifications that should appear in the block
 * @param alwaysDisplay      Whether the block should always appear, even if there are
 *                           no notifications in it
 * @param actorKind          The kind of actor to display as children of each notification. If null,
 *                           then this block doesn't display actors at all
 * @param showActors         Whether the notifications in this block should display their associated
 *                           actors.
 * @param noNotificationsMsg The message to display if the block contains no notifications
 */
nautilus_utils.NotificationBlock.prototype = {

  initialize : function(id, name, notifications, alwaysDisplay, actorKind, showActors, noNotificationsMsg) {
    this.id = id;
    this.name = name;
    if ( !id.endsWith( "OVERDUE" ) )
    {
      this.numItems = notifications.inject(0, function(acc, item) { return acc + item.recipientCount; });
    }
    else
    {
      this.numItems = notifications.inject(0, function(acc, item) { return acc + item.receiverCount; });
    }
    this.notifications = notifications;
    this.alwaysDisplay = alwaysDisplay;
    this.actorKind = actorKind;
    this.showActors = showActors;
    this.noNotificationsMsg = noNotificationsMsg;
  }

};


/**
 * Encapsulates details of a generic "block": its unique key,
 * its translated name, and its contents
 */
nautilus_utils.GenericBlock = Class.create();

nautilus_utils.GenericBlock.prototype = {

  initialize : function(id, name, contentsId, numItems) {
    this.id = id;
    this.name = name;
    this.numItems = numItems;
    this.contentsId = contentsId;
  }

};

}
/**
 *
 * Introduction
 * ============
 * This model contains all relevant data about the notifications available to a given user, including:
 *
 *   o Notifications, indexed by category (source type, course, event, etc)
 *   o Notification actors, indexed by their parent notifications
 *   o Available categories
 *   o Static information about registered sources
 *
 * The general philosophy of this model (and of Nautilus views in general), is as follows:
 *
 *   1) Load up all notifications for the current user immediately, on page load, and store them
 *      in-page. This allows multiple views to share the same data, and for each view to react
 *      appropriately to actions taken in their sibling views.
 *
 *   2) Load up notifications *actors* on demand, but share them among all views. They
 *      will be saved by the model, individually and indexed by notification.
 *
 *   3) Perform all actions asynchronously -- which is to say, call down to the server
 *      to ask the modules associated with each notification/actor how to respond
 *      to an invoked action. The response is generally going to be a navigation,
 *      and the modules will be responsible for telling us (via the Ajax response)
 *      where to navigate to. We are taking this approach to avoid the bandwidth hit
 *      of sending all navigational information up to the view, when, realistically,
 *      the user will only invoke a very view of them before leaving the page.
 *
 *   4) Use a callback mechanism to inform both notification and actor containers when
 *      their respective data is loaded -- we need to adopt this approach because
 *      of the asynchronous nature of data loads.
 *
 *
 * Loading Notifications
 * =====================
 * Notfication and source data are loaded asynchronously from the server, so the first step
 * in dealing with this model is always a call to initNotifications(). Callers should not
 * attempt to draw data from the model until the notification load is complete (signified by
 * a return code of LOAD_COMPLETE from the call to initNotifications).
 *
 * *Note*: No attempt should be made to use any other functions in this package until
 * initNotifications reports that the load is complete.
 *
 *
 * Notification Grouping
 * ======================
 * The way that notifications are represented on the server does not always map exactly
 * to the way that
 *
 *
 * Registering Views
 * =================
 * The preferred mechanism for initializing a view is to register with the model, using the
 * registerNotificationContainer function -- this accepts a a view container, which is basically
 * an object that implements the "notificationLoaded" function. The NautilusView class
 * provides a default implementation of this function. All registered containers will be
 * informed when the notification load is complete.
 *
 *
 * DWR & Implicit Data Structures
 * ==============================
 * This model uses several data structures that are automatically generated based on Java
 * objects. This is made possible via a service called Direct Web Remoting (DWR), which
 * facilitates and automates asynchronous, Ajax-based communications between client and server.
 * The NautilusViewService object is our DWR-mediated interface to the backend.
 *
 * The data structures that we use to communicate with the server (and store in this model) are
 * as follows:
 *
 *   o NotificationItemView          : A single notification item
 *   o NotificationItemRecipientView : A single notification actor
 *   o NotificationActionView        : Describes an action that can be invoked from the views
 *   o NautilusSourceInfo            : Data on a single Nautilus source (key, name, events, actions)
 *   o NautilusViewInfo              : Contains all available source information (NautilusSourceInfo
 *                                     objects), and all notifications available for the current user.
 *                                     Used for model initialization.
 *
 * Again, each of these objects is defined in the server layer, and translated dynamically into
 * a corresponding set of javascript objects by DWR. For details on their contents, see the
 * corresponding Java objects.
 *
 */
var notification_controller = {

  addWindowOnLoadEvent : false,
  // the categories available for notification classifications
  CATEGORY_SOURCE : 1,
  CATEGORY_EVENT  : 2,
  CATEGORY_COURSE : 3,
  CATEGORY_DATE   : 4,


  // the status of an item load
  LOAD_NOT_STARTED : 1,
  LOAD_IN_PROGRESS : 2,
  LOAD_COMPLETE    : 3,

  // the kinds of notification actors
  RECIPIENT_SENDER    : "SENDER",
  RECIPIENT_RECEIVER  : "RECEIVER",
  RECIPIENT_NONE      : "NONE",

  // the types of actions that can be requested by view items
  ACTION_NAVIGATE  : "NAVIGATE",
  ACTION_REMOVE    : "REMOVE",
  ACTION_NONE      : "NONE",
  ACTION_EMAIL     : "EMAIL",
  ACTION_UPDATE    : "UPDATE",

  // standard events
  DUE_EVENT        : "DUE",

  // the delimiter we use for compound keys
  KEY_DELIMITER : "::",

  // contains all notifications
  notifications : $H(),

  // organizes subsystems by their subystem
  notificationsBySource : $H(),

  // organizes notification by their subsystem/event type
  notificationsByEvent : $H(),

  // organizes notifications by their parent course
  notificationsByCourse: $H(),

  // organizes notifications by their due dates
  notificationsByDate: $H(),

  // organizes notifications by their true ids
  notificationsById: $H(),

  // notification actors (both senders and receivers)
  actors : $H(),

  // arrays of notification actors, indexed by their associated notification
  actorsByNotification : $H(),

  // hash of (sourceType::eventType,1)
  sourceEvents : $H(),

  // information about sources, including: source name, available events, available actions
  sourceInfo : null,

  // maps courses to the urls necessary to reach those courses' home page
  courseLinks: null,

  // all registered notification containers; containers are informed of all events in
  // the models lifecycle
  notificationContainers : {},

  // listeners who just want to be informed when the notification load is complete
  loadListeners : [],

  // indicates whether the initial notification load is complete
  notificationLoadStatus: this.LOAD_NOT_STARTED,

  // data structures used by EWS:
  courseIdToCourseNameMap : null,
  courseIdToEwsItemListMap : null,
  ewsIdToEwsItemMap : null,
  sortedCourseIdsListForEws: null,

  //the currently login user
  userId: null,

  // the date on which these notifications were last loaded
  refreshDate: null,

  //flag which determines if user is Observer
  isObserver: false,

  // the id of the course whose context we're in; null if we're not in a course
  // context
  courseId: null,
  
  // when requesting notifications from the server, indicate that there should be
  // a cap on the number returned.  Usually set to true when there is no course or org
  // context.
  limitNotificationLoad: false,

  /**
   * Load up all notifications for the given user, and places them in the
   * page model. Returns the load status.
   *
   * If the status is LOAD_IN_PROGRESS, then the caller should assume that the
   * notifications have not yet been loaded. The loader service will
   * call all registered containers when the load is complete.
   *
   * If the status is LOAD_COMPLETE, then the caller may begin to load
   * notifications from the model immediately.
   *
   * *Warning*: Any attempt to deal with the model in any way before the
   * status is LOAD_COMPLETE will unleash a horde of shambling COBOL mummies
   * into your codebase. They will crush your meticulously constructed data
   * structures into a pulpy chaos of semantic soup, and then launch into a
   * terrifying moan-chorus of supulchral triumph.
   *
   * @param courseId The course we should load notifications for. Optional.
   * @return         The status of the load
   */
  initNotifications : function() {

    // initialize our logger
    this.nautilusLog = log4javascript.getDefaultLogger();

    // if this is the first time we're getting a load request
    if (!this.notificationLoadStatus || this.notificationLoadStatus == this.LOAD_NOT_STARTED) 
    {
      // indicate that we're staring a load.
      this.notificationLoadStatus = this.LOAD_IN_PROGRESS;

      // call down to the server to get all notification info for the current user; this
      // returns an aggregate data structure that contains both a list of all
      // notifications and information about all registered sources
      if ( this.limitNotificationLoad )
      {
        NautilusViewService.getViewInfoWithLimit( courseId, groupId, this.sourceEvents.keys(), document.location.href,
                                         false, notification_controller.initCallBack.bind( this ) );
      }
      else
      {
        NautilusViewService.getViewInfo( courseId, groupId, this.sourceEvents.keys(), document.location.href,
                                         false, notification_controller.initCallBack.bind( this ) );
      }
    }
    return this.notificationLoadStatus;
  },
  
  initCallBack : function( viewInfo )
  {
    // if there was an error retrieving the notifications, tell each module about it
    if (viewInfo.errorMessage) {
      module_controller.displayErrorMessage(viewInfo.errorMessage);
    }   
    // otherwise set up the model, then inform each registered view that its
    // notifications are ready
    else 
    {
      this.sourceInfo                    = viewInfo.sourceInfo;
      this.courseLinks                   = viewInfo.courseLinks;
      this.resources                     = viewInfo.resources;
      this.courseIdToCourseNameMap       = viewInfo.courseIdToCourseNameMapForEws;
      this.courseIdToEwsItemListMap      = viewInfo.courseIdToEwsDisplayMap;
      this.ewsIdToEwsItemMap             = viewInfo.ewsIdToEwsDisplayMap;
      this.sortedCourseIdsListForEws     = viewInfo.sortedCourseIdsListForEws;
      this.expansionIds                  = $A(viewInfo.expansionIds) || {};
      this.userId                        = viewInfo.userId;
      this.refreshDate                   = viewInfo.refreshDate;
      this.isObserver                    = viewInfo.isObserver;
    
      this._addNotifications(viewInfo.notifications);
    
      this.notificationLoadStatus = this.LOAD_COMPLETE;
    
      // tell all registered notification containers that we're finished
      $H(this.notificationContainers).values().each( function(container) {
        container.notificationsLoaded();
      });
    
      // tell all listeners who are waiting for the load to complete that it
      // has done so
      this.loadListeners.each(function (listener) {
        listener.loadComplete();
      });
    
    }
  },
  
  setLimitNotificationLoad : function ( flag )
  {
    // can be set by multiple modules on a page.  Maintain true value if set to true.
    this.limitNotificationLoad = this.limitNotificationLoad || flag;
  },

  registerView : function( container ) {
    this.courseId = container.courseId;
    this.groupId = container.groupId;

    // store Events to hash sourceEvents ( source::eventId )
    var sourceIdsHash = $H(container.sourceIds);
    sourceIdsHash.keys().each(function(source) {
      sourceIdsHash.get(source).each(function(eventId) {
        notification_controller.sourceEvents.set(source + notification_controller.KEY_DELIMITER + eventId, 1);
      });
    });
    // Register the given notification container. All registered containers will be informed
    // when notification load events occur (currently, this is limited to "notification load complete" events).
    this.notificationContainers[container.viewId]= container;

    // Invoke initNotifications() after page loading completes to ensure it is called after all the views on the page
    // register themselves so it can loads notifications for the registered views all at once.
    // Calling it too early can cause notifications for yet-to-register views to be missing
    if (!this.addWindowOnLoadEvent) {
      this.addWindowOnLoadEvent = true;
      Event.observe(window, 'load', function() {
        notification_controller.initNotifications();
      });
    }
  },
 
  /**
   * Returns the status of the notification. It is not safe to interact with this model
   * until the load status is LOAD_COMPLETE.
   *
   * @return The load status
   */
  getLoadStatus : function() {
    return this.notificationLoadStatus;
  },

  // TODO: should all functions do a "notification load complete" check?

  /**
   * Returns a list of all sources that have associated notifications.
   *
   * @return A list of source keys
   */
  getSources: function () {
    return this.notificationsBySource.keys();
  },


  /**
   * Returns a list of all events that have associated notifications. The event
   * key is a combination of both source type and event type, in the following
   * format:
   *
   *   [sourcekey]::[eventKey]
   *
   * @param filter Optional parameter to specify events we care about
   * @return       A list of event keys
   */
  getEvents: function(filter) {

    var events = this.notificationsByEvent.keys();

    if (filter) {
      events = events.findAll ( function(event) {
        return filter.find(function (item) { return item == event; });
      });
    }

    return events;
  },

  /**
   * Returns the translated title of the given event
   *
   * @param source The source to which the event belongs
   * @param event  The name of the event
   * @return       Event title
   */
  getEventTitle: function(source, event) {
    return this.getSourceInfo(source).events[event];
  },


  /**
   * Get the translated resource.
   *
   * @param key Resource key
   * @return    Translated resource
   */
  getResource : function( key /*, arg1, arg2, ..., argN */ )
  {
    var result = null;
    if ( key && this.resources && this.resources[key] )
    {
      result = this.resources[key];
    }
    if ( !result )
    {
       return "!!!!" + key + "!!!!!";
    }
    else
    {
      if ( arguments.length > 1 )
      {
        for ( var i = 1; i < arguments.length; i++ )
        {
          result = result.replace( new RegExp("\\{"+(i-1)+"\\}","g"), arguments[i] );
        }
      }
      return result;
    }
  },

  /**
   * Returns a a list of all courses that have associated notifications.
   *
   * @return A list of all sources that have notifications
   */
  getCourses: function() {
    return this.notificationsByCourse.keys();
  },

  /**
   * Return the url to the course represented by the given id.
   *
   * @param courseId The id of the course whose link we seek
   */
  getCourseLink: function(courseId) {
    return this.courseLinks[courseId];
  },

  /**
   * Returns source information for the given notification.
   *
   * @param notificationId The notification we seek source info for
   */
  getSourceInfoForNotification : function(notificationId) {
    return this.sourceInfo[this.notifications.get(notificationId).sourceType];
  },


  /**
   * Returns the notification associated with the given id, or null if
   * none exists
   *
   * @param id The notification id
   * @return   The associated notification
   */
  getNotification: function (id) {
    return this.notifications.get(id);
  },


  /**
   * Returns source information for the given source type.
   *
   * @param sourceType The kind of source to grab information for
   */
  getSourceInfo : function(sourceType) {
    return this.sourceInfo[sourceType];
  },


  /**
   * Returns all notifications that belong to the given source type, optionally filtered
   * by the specified event types.
   *
   * @param source The source whose events we seek
   * @param events An optional array of desired events. If null, all notifiations for this source
   *               are returned, regardless of event type
   */
  getNotificationsBySource : function(source, events) {

    var notifications = this.notificationsBySource.get(source);

    if (notifications && events) {

      // drop the desired events into a hash, for faster comparisons
      var eventsHash = $H();
      events.each(function(item){ eventsHash.set(item,true); });

      notifications = notifications.findAll(function(item){
        return eventsHash.get(item.eventType);
      });

    }

    return notifications;

  },


  /**
   * Returns all notifications associated with the given event. The event
   * must by fully-qualified:
   *
   *   <source type>::<event type>
   *
   * @param events The event whose notifications we seek - this can be a single
   *               event or an array of events
   * @return       The notifications, or null if no such notifiations exist
   */
  getNotificationsByEvent : function(events) {

    if (events) {

      var allNotifications = [];

      [events].flatten().each(function (event) {
        var notifications = this.notificationsByEvent.get(event);
        if (notifications)
        {
          allNotifications.push(notifications);
        }
      }.bind(this));

      return allNotifications.flatten();
    }

  },


  /**
   * Returns the notification associated with the given internal id, or null if
   * none exists
   *
   * @param id The internal notification id
   * @return   The associated notification
   */
  getNotificationByInternalId : function(id) {
    return this.notificationsById.get(id);
  },

  /**
  * Removes all of notifications from one block or one view, and informs all listeners about its passing.
  *
  * @param blockId The id of the block
  * @param viewId  The id of the view
  */
  clearNotifications: function(viewId, blockId) {

    var notificationViewIds = [];
    var notificationIds = [];

    var view = notification_controller.notificationContainers[viewId];

    if (viewId && !blockId ){

      var blocks = $H(view.blocks).values();

      // loop through all the blocks in the view
      blocks.each( function(block) {

        // if this block maintains a list of notifications, gather them up
        if (block.notifications) {

          block.notifications.each(function(notification){
            notificationViewIds.push(notification.viewId);
            notification.notificationIds.each(function(notificationId){
              notificationIds.push(notificationId);
            });
          });

        }

      });

    }

    if (blockId ) {

      var block = view.blocks[blockId];

      // if this block maintains a list of notifications, gather them up
      if (block.notifications) {

        block.notifications.each( function(notification) {
          notificationViewIds.push(notification.viewId);
            notification.notificationIds.each( function(notificationId) {
            notificationIds.push(notificationId);
          });
        });

      }

    }

    // only call down if we've got something to remove
    if (notificationIds.length > 0) {

      NautilusViewService.removeNotificationsFromUser(notificationIds, {

        // display a message if the removal fails
        errorHandler: function(message) {

          // todo let's do something nicer than this, shall we?
          alert("Error removing notifications! " + message);

        },

        // remove the notifications from the display if the removal succeeds
        callback: function(item) {

          notificationViewIds.each( function(notificationViewId) {

            // remove the notification from the central hash, and from all categories
            var notification = this.getNotification(notificationViewId);

            // remove the notification from the central hash, and from all categories
            this.notifications.unset(notificationViewId);
            this._removeNotificationFromList(this.notificationsBySource.get(notification.sourceType), notificationViewId);
            this._removeNotificationFromList(this.notificationsByEvent.get(this.buildEventKey(notification)), notificationViewId);
            this._removeNotificationFromList(this.notificationsByCourse.get(notification.courseId), notificationViewId);

            // tell all registered containers about the elision
            $H(this.notificationContainers).values().each(function(container){
              container.notificationRemoved(notificationViewId);
            });

          }.bind(this));
        }.bind(this)

      });

    }

  },

  /**
   * Removes the given notification from the model, and informs all listeners about its passing.
   *
   * @param notificatinViewId The id of the notification to remove
   */
  removeNotification: function(notificationViewId) {

    var notification = this.getNotification(notificationViewId);

    NautilusViewService.removeRecipient(notification.recipientId, {

      // display a message if the removal fails
      errorHandler: function(message) {
        // todo let's do something nicer than this, shall we?
        alert("Error removing notification! " + message);
      },

      // remove the actor from the display if the removal succeeds
      callback: function(item) {
        this._removeNotificationFromModel(notificationViewId);
      }.bind(this)

    });



  },

  /**
   * Removes all actor entries for the current user from the given notificaiton.
   *
   * @param notificationViewId  The notification to act on
   */
  removeNotificationActorsForUser: function(notificationViewId) {

    var notification = this.getNotification(notificationViewId);

    NautilusViewService.removeNotificationsFromUser(notification.notificationIds, {

      // display a message if the removal fails
      errorHandler: function(message) {
        // todo let's do something nicer than this, shall we?
        alert("Error removing notification! " + message);
      },

      // remove the notification from the model if the removal succeeds
      callback: function(item){
        this._removeNotificationFromModel(notificationViewId);
      }.bind(this)

    });

  },

  /**
   * Refreshes the notifications in all modules on the current page, by requesting a cache
   * update and then reloading all notifications.
   */
  refreshNotifications: function() {

    // reset the modules to "loading" state
    module_controller.resetModules();

    // tell all the views we're about to rain destruction down on the model
    $H(this.notificationContainers).values().each( function(container) {
      container.notificationsUnloaded();
     });

    // remove notifications from the model
    this.notifications         = $H();
    this.notificationsBySource = $H();
    this.notificationsByEvent  = $H();
    this.notificationsByCourse = $H();
    this.notificationsByDate   = $H();
    this.notificationsById     = $H();
    this.actorsByNotification  = $H();
    this.actors                = $H();

    // invalidate the cache
    NautilusViewService.refreshNotifications();

    // force a reload
    this.notificationLoadStatus = this.LOAD_NOT_STARTED;
    this.initNotifications();

  },


  /**
   * Removes the actor for the current user from the given notification.
   *
   * @param notificationId  The id of the notification whose actor must do the mortal-coil shuffle
   * @param actorId         The local id of the actor; used only to determine which actor entry to remove from the view
   */
  removeActorForUser: function(notificationId, actorId) {

    NautilusViewService.removeNotificationsFromUser([notificationId], {

      // display a message if the removal fails
      errorHandler: function(message) {
        // todo let's do something nicer than this, shall we?
        alert(message);
      },

      // remove the actor from the display if the removal succeeds
      callback: function(item) {
        this._removeActorFromModel(actorId);
      }.bind(this)

    });

  },

  /**
   * Remove the given actor from the model, and inform all registered actor containers about
   * the elision.
   *
   * @param actorId            The id of the actor to remove
   */
  removeActor: function(actorId) {

    var actor = this.actors.get(actorId);

    NautilusViewService.removeRecipient(actor.id, {

      // display a message if the removal fails
      errorHandler: function(message) {
        // todo let's do something nicer than this, shall we?
        alert(message);
      },

      // remove the actor from the display if the removal succeeds
      callback: function(item) {
        this._removeActorFromModel(actorId);
      }.bind(this)

    });

  },


  _removeActorFromModel: function(actorId){

    var actor = this.actors.get(actorId);

    if (actor) {

      // remove it from the general store
      this.actors.unset(actorId);

      // now remove it from its parent notification bucket
      var notificationBucket = this.actorsByNotification.get(actor.notificationId);

      if (notificationBucket) {

        actor = notificationBucket.each(function(item, index){
          if (item.id == actorId) {
            notificationBucket.splice(index, index);
            throw $break;
          }
        });

      }

      // tell all registered containers about the elision
      $H(this.notificationContainers).values().each(function(container){
        container.actorRemoved(actorId);
      });

    }

  },


  /**
   * Returns the actor with the given id, or null if none with that keys exists.
   *
   * @param actorId The id of the actor to look up
   */
  getActor : function(actorId) {
    return this.actors.get(actorId);
  },


  /**
   * Gets the actors associated with the given notification. If the actors have already
   * been loaded, then the function will simply return them.
   *
   * If the actors have *not* yet been loaded (or are in the process of being loaded)
   * the function will instead return a status of LOAD_IN_PROGRESS. If the calling container
   * is registered, it will be informed when the actors have been loaded (as will
   * all registered actor containers).
   *
   * @param notificationId The notification to load receivers for
   * @param actorKind      The kind of actors to load -- senders or receivers
   * @return               The receivers, or a status of LOAD_IN_PROGRESS
   */
  getActors: function (notificationId, actorKind) {

    var actors = this.actorsByNotification.get(notificationId);

    if ( actors )
    {
      return actors;
    }
    else
    {
      return this._loadActors(notificationId, actorKind);
    }
  },


  /**
   * Returns a list of the actions for the given notification. The list will vary based
   * on whether the person been notified is a sender or a receiver.
   *
   * @param notificationId The notification whose actions we seek
   * @return               A list of action keys, or null if no actions are defined
   */
  getNotificationActions : function(notificationId) {

    var notification = this.getNotification(notificationId);
    var sourceInfo   = this.sourceInfo[notification.sourceType];

    // get the actions appropriate to the user's role in this notificaiton -- it varites
    // based on whether he's a sender or a receiver
    var actionMap =
      notification.recipientType == this.RECIPIENT_SENDER ? sourceInfo.senderActions : sourceInfo.receiverActions;

    // now get the specific actions for this event
    return actionMap[notification.eventType];
  },


  /**
   * Returns a list of the actions for the given actor.
   *
   * @param actor The actor whose actions we seek
   * @return      A list of action keys, or null if no actions are defined
   */
  getActorActions : function(actorId) {
    var notification = this.getNotification(this.actors.get(actorId).notificationViewId);
    return this.sourceInfo[notification.sourceType].actorActions[notification.eventType];
  },


  /**
   * Returns the action that the source associated with the given notificaiton has
   * designated as the default.
   *
   * @param notificationId The id of a notification
   */
  getDefaultAction : function(notificationId) {
    var notification = this.getNotification(notificationId);
    return this.sourceInfo[notification.sourceType].defaultActions[notification.eventType];
  },


  /**
   * Returns specific information about the given action.
   *
   * @param notificationId The notification with which this action is associated
   * @param actionKey      The key that identifies the action
   */
  getNotificationActionInfo: function (notificationId, actionKey) {
    return this.getNotificationActions(notificationId).find( function(item) { return item.actionKey == actionKey; });
  },


  /**
   * Returns specific information about the given actor action.
   *
   * @param notificationId The actor with which whom action is associated
   * @param actionKey      The key that identifies the action
   */
  getActorActionInfo: function (actorId, actionKey) {
    return this.getActorActions(actorId).find( function(item) { return item.actionKey == actionKey; });
  },


  /**
   * Handles an action request coming from a notification. Sends a request down to the
   * associated souirce module to do the actual processing. If the action involves a navigation,
   * it will occur after the module supplies the necessary information.
   *
   * @param notificationId The notification we're acting on
   * @param actionKey      The action key
   */
  handleNotificationAction : function(notificationId, actionKey, defaultAction) {

    var actionInfo = defaultAction ? this.getDefaultAction(notificationId) : this.getNotificationActionInfo(notificationId, actionKey);
    var notification = this.getNotification(notificationId);

    NautilusViewService.handleNotificationAction( notification.sourceType, notification.recipientType, notification.notificationIds[0], actionKey, function(item) {

      // rewrite the navigation URL so that it appears in the context of the appropriate course
      if (actionInfo.actionKind == this.ACTION_NAVIGATE) {
        if ( item.indexOf( "&isLaunchInNewWindow=true" ) < 0 )
        {
          var url = this.getCourseLink(notification.courseId) + encodeURIComponent(encodeURIComponent(item));
          window.parent.location = url;
        }
        else
        {
          window.open( item );
        }
      }

    }.bind(this));

  },


  /**
   * Handles an action request coming from a notification actors. Sends a request down to the
   * associated module to do the actual processing. If the action involves a navigation,
   * it will occur after the module supplies the necessary information. If it involves
   * the removal of an actor, the deletion will occur after the module responds, and
   * will be propagated to all subscribing actor containers.
   *
   * @param actorId   The actor on which an action was invoked
   * @param actionKey The action key
   */
  handleActorAction : function(actorId, actionKey) {

    var notification = this.notifications.get(this.actors.get(actorId).notificationViewId);
    var actionInfo = this.getActorActionInfo(actorId, actionKey);

    // for email actions, just forward to the email page
    if (actionKey == this.ACTION_EMAIL) {

      var actor = this.getActor(actorId);
      var emailUrl = "/webapps/blackboard/execute/displayEmail?navItem=";

      var defaultId;

      if (actor.groupId) {
        emailUrl += "cp_send_email_select_groups";
        defaultId = actor.groupId;
      }

      else {
        emailUrl += "cp_send_email_select_students";
        defaultId = actor.userId;
      }

      window.parent.location =
        this.getCourseLink(notification.courseId) +
          encodeURIComponent(
            encodeURIComponent(
              emailUrl += "&course_id=" + notification.courseId + "&default_id=" + defaultId));

    }

    else {

      // call down to the server to handle the action; when the response comes back,
      // act based on the action kind
      NautilusViewService.handleActorAction( notification.sourceType, actorId, actionKey, function(item) {

        // TODO: we need to make sure the action was successful before we do any of this stuff

        // if this is a navigation action, then the module should have returned the url to
        // navigate to; follow it
        if (actionInfo.actionKind == this.ACTION_NAVIGATE) {
          window.parent.location = this.getCourseLink(notification.courseId) + encodeURIComponent(encodeURIComponent(item));
        }

        // if this is a removal action, then delete the actor
        else if (actionInfo.actionKind == this.ACTION_REMOVE) {
          this.removeActor(actorId);
        }

      }.bind(this));

    }
  },

  /**
   * Register the expansion state of the given node. Implicitly pegs the state to
   * the current page context.
   *
   * @param nodeId   The id of the node in question
   * @param expanded The expansion state - true if expanded, false otherwise
   */
  registerNodeExpansion: function (nodeId, expanded) {
    NautilusViewService.handleExpansion(nodeId, document.location.href, expanded);
  },


  /**
   * Returns true if the given node is expanded, for the current context. This
   * represents the saved session expansion state.
   *
   * @param nodeId  The node whose expansion state we seek
   */
  isNodeExpanded: function(nodeId) {
    return this.expansionIds.include(nodeId);
  },


  /**
   * Register a listener who wants to be informed when the notification model is
   * finished loading. If you want your listener to be informed of every event
   * in the model's lifecycle, use registerNotificationContainer instead.
   *
   * @param listener The object to inform of the load
   */
  registerLoadListener: function(listener) {
    this.loadListeners.push(listener);
  },



  /**
   *
   * @param {Object} item
   */
  buildEventKey: function(item) {
    return item.sourceType + this.KEY_DELIMITER + item.eventType;
  },

  parseEventKey: function(eventKey) {
    return eventKey.split(this.KEY_DELIMITER);
  },

  buildEwsItemKey: function(ewsItem) {
    return ewsItem.viewId + this.KEY_DELIMITER + ewsItem.ruleId;
  },



  // --------------- private functions


  /**
   * Loads sender or receiver actors for the given notification, by calling down to the
   * server.
   *
   * If the actors for the given notification have already been loaded, then simply
   * returns a status of LOAD_COMPLETE.
   *
   * Otherwise, calls down to the server to retrieve the requested data, and calls out to all
   * subscribing actor containers when the data come back.
   *
   * @param notificationId The notification whose receivers we need to load
   * @param actorKind      Sender or receiver
   * @return               LOAD_COMPLETE if the receivers have already been loaded; LOAD_IN_PROGRESS
   *                       otherwise.
   */
  _loadActors: function (notificationId, actorKind) {

    var actors = this.actors.get(notificationId);

    if (actors) {
      return this.LOAD_COMPLETE;
    }

    else {

      // grab all the ids of the concrete notifications that are represented by
      // this notification view
      var ids = this.getNotification(notificationId).notificationIds;

      // call down to the server to retrieve all receivers for this notification
      NautilusViewService.getNotificationActors(ids, actorKind, function(items) {

        // if there are any actors to display
        if (items && items.length > 0) {

          // add them to the model
          this._addActors(items, notificationId);

          // call out to all listeners
          $H(this.notificationContainers).values().each(function(container){
            container.actorsLoaded(notificationId, items);
          });

        }

      }.bind(this));

      return this.LOAD_IN_PROGRESS;
    }

  },

   /**
   * Adds the given value to the array in the given hash bucket. Creates the
   * array if it's not already there.
   *
   * @param hash  The hash we're working with
   * @param key   The key representing the bucket we want to insert at
   * @param value The value we're inserting
   */
  _smartPush: function(hash, key, value) {
    if ( !hash.get(key) )
    {
      hash.set(key, $A());
    }
    hash.get(key).push(value);
  },


  /**
   * Removes the notification with the given id from the given list of notifications.
   *
   * @param list               The list to remove notificaitons from
   * @param notificationViewId The id of the notification to remove
   */
  _removeNotificationFromList: function(list, notificationViewId) {
    list.each(function(item, index) {
      if (item.viewId == notificationViewId) {
        list.splice(index, index);
        throw $break;
      }
    });
  },

  /**
   * Adds notifications to the model, assigning each to the appropriate classification.
   *
   * @param list The list of notifications.
   */
  _addNotifications: function (list) {

    // add the notification to the main model, as well as all the different category views
    $(list).each ( function (item) {
      this.notifications.set(item.viewId, item);
      this._smartPush(this.notificationsBySource, item.sourceType, item);
      this._smartPush(this.notificationsByEvent, this.buildEventKey(item), item);
      this._smartPush(this.notificationsByCourse, item.courseId, item);

      item.notificationIds.each(function (id) {
        this.notificationsById.set(id, item);
      }.bind(this));

      if (item.eventType == this.DUE_EVENT) {
        this._smartPush(this.notificationsByDate, this.normalizeDate(item.dueDate).getTime(), item);
      }

    }.bind(this));

  },


  /**
   * Removes all traces of the notification represented by the given view id from the model.
   *
   * @param notificationViewId The notification that we MUST DESTROY!
   */
  _removeNotificationFromModel: function(notificationViewId) {

    var notification = this.getNotification(notificationViewId);

    // remove the notification from the central hash, and from all categories
    this.notifications.unset(notificationViewId);
    this._removeNotificationFromList(this.notificationsBySource.get(notification.sourceType), notificationViewId);
    this._removeNotificationFromList(this.notificationsByEvent.get(this.buildEventKey(notification)), notificationViewId);
    this._removeNotificationFromList(this.notificationsByCourse.get(notification.courseId), notificationViewId);

    // tell all registered containers about the elision
    $H(this.notificationContainers).values().each(function(container) {
      container.notificationRemoved(notificationViewId);
    });

  },



  /**
   * Adds the given actors to the model, indexing them by notification id.
   *
   * Note: it is assumed that all actors passed in belong to the given notification.
   * If they do not, tiny code-locusts will descend from the heavens and chatter
   * through your code, reducing them to torn husks of ones and zeroes. So
   * beware.
   *
   * @param actors              An array of actors to add.
   * @param notificationViewId  The view id notification to which the actors belong.
   */
  _addActors: function(actors, notificationViewId) {

    // first add the actor to the general store
    actors.each( function(actor) {

      // add the view id of the parent notification to the actor object
      actor.notificationViewId = notificationViewId;
      this.actors.set(actor.id, actor);
    }.bind(this));

    // now add them to the notification-specific store
    if ( !this.actorsByNotification.get(notificationViewId))
    {
      this.actorsByNotification.set(notificationViewId, $A());
    }
    this.actorsByNotification.get(notificationViewId).concat(actors);


  },


  /**
   * Returns a list of alphabetically sorted courses that has EWS which the user can access.
   *
   * @return A list of course that has EWS which the user can access.
   */
  getSortedCoursesForEWS: function() {
    return this.sortedCourseIdsListForEws;
  },

  /**
   * Returns the course name.
   *
   * @return course name
   */
  getCourseName: function( courseId ) {
    return this.courseIdToCourseNameMap[courseId];
  },

  /**
   * Returns the NautilusEwsRuleDisplayItem object for the specified ews item id.
   *
   * @return NautilusEwsRuleDisplayItem object
   */
  getEwsItem: function(ewsItemId) {
    return this.ewsIdToEwsItemMap[ewsItemId];
  },

  /**
   * Returns the NautilusEwsRuleDisplayItem object for the specified ews item id.
   *
   * @return URL for a ACTION_NAVIGATE or updated HTML for ACTION_UPDATE
   */
  handleEwsAction : function( ewsId, actionKey )
  {
    var ewsItem = this.getEwsItem(ewsId);
    var actionInfo = this.getGeneralActionInfo(ewsItem.sourceType, ewsItem.eventType, actionKey);


    if (actionInfo.actionKind == this.ACTION_NAVIGATE)
    {
      NautilusViewService.handleGeneralAction( ewsItem.sourceType, ewsItem.courseId, ewsId, actionKey, function(item)
      {
        window.parent.location = this.getCourseLink(ewsItem.courseId) + encodeURIComponent(encodeURIComponent(item));
      }.bind(this));
    }
    else if (actionInfo.actionKind == this.ACTION_UPDATE)
    {
      NautilusViewService.handleUpdateGeneralAction( ewsItem.sourceType, ewsItem.courseId, ewsId, actionKey, ewsItem.viewId, function(refreshedEwsItem)
      {
        // build new item key
        var ewsItemKey = this.buildEwsItemKey( refreshedEwsItem );
        if ( refreshedEwsItem.ruleFound )
        {
          // add item to data structures
          this.ewsIdToEwsItemMap[refreshedEwsItem.ruleId] = refreshedEwsItem;
          var ewsItemsList = this.courseIdToEwsItemListMap[refreshedEwsItem.courseId];
          var existingEwsItem = ewsItemsList.find( function(item) { return item.ruleId == refreshedEwsItem.ruleId; } );
          existingEwsItem.warnedCount = refreshedEwsItem.warnedCount;
          existingEwsItem.lastRefreshDate = refreshedEwsItem.lastRefreshDate;
          existingEwsItem.ruleTitleDisplay = refreshedEwsItem.ruleTitleDisplay;
          existingEwsItem.ruleName = refreshedEwsItem.ruleName;
          existingEwsItem.lastRefreshDate = refreshedEwsItem.lastRefreshDate;

          // build new line item
          var ewsView = notification_controller.notificationContainers[refreshedEwsItem.viewId];
          var newLineItem = ewsView.buildLineItem(refreshedEwsItem.ruleId, refreshedEwsItem);

          // replace existing line item with new line item
          var parentNode = $(ewsItemKey).parentNode;
          var oldNode = $(ewsItemKey);
          parentNode.replaceChild(newLineItem, oldNode);
        } else {
          // delete the item
            $(ewsItemKey).remove();
          }
        }.bind(this));
      }
    },

    /**
   * Returns the NautilusEwsRuleDisplayItem object in a course.
   *
   * @return a list of NautilusEwsRuleDisplayItem objects that are in a course
   */
  getEwsItemListForCourse: function( courseId ) {
    return this.courseIdToEwsItemListMap[courseId];
  },

   /**
   * Returns specific information about the given action.
   *
   * @param sourceType     The source type with which this action is associated
   * @param eventType      The event type with which this action is associated
   * @param actionKey      The key that identifies the action
   */
  getGeneralActionInfo: function (sourceType, eventType, actionKey) {
    return this.getGeneralActions(sourceType, eventType).find( function(item) { return item.actionKey == actionKey; });
  },

  /**
   * Returns a list of the general actions for the given sourceType, eventType.
   *
   * @param sourceType     The source type
   * @param eventType      The event type
   * @return               A list of action keys, or null if no actions are defined
   */
  getGeneralActions : function(sourceType, eventType) {

    var sourceInfo = this.sourceInfo[sourceType];

    // gets the general notification, e.g. non notiication types, such as EWS, discussions
    var actionMap = sourceInfo.generalActions;

    // now get the specific actions for this event
    return actionMap[eventType];
  },

  /**
   * Returns a list of the general actions for an EWS item.
   *
   * @param ewsItemId      The id of the EWS item for which to get the general actions.
   * @return               A list of action keys, or null if no actions are defined
   */
  getGeneralActionsByEwsId : function(ewsItemId) {

  var ewsItem = this.getEwsItem(ewsItemId);
    return this.getGeneralActions( ewsItem.sourceType, ewsItem.eventType );
  },


  /**
   * Normalize the given date to remove any time information.
   *
   * @param date The date to normalize
   * @return     The same date, shorn of all time info.
   */
  normalizeDate: function (date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
  }

};


/**
 * Controls aspects of the display of the set of nautilus modules on a single page.
 */
var module_controller = {

  modules : $H(),

  /**
   * Register a module, and its views, with the controller.
   *
   * @param moduleId  The id of the module
   * @param viewIds   The ids of all the view it contains
   */
  addModule: function(moduleId, viewIds) {

    // add the module to the list, and associate it with a hash that maps each
    // of its views to a display status (which is initialized to false)
    this.modules.set(moduleId, viewIds.inject($H(), function(viewTracker, viewId) {
      viewTracker.set(viewId, false);
      return viewTracker;
    }));

    // change the background color
    $(moduleId).addClassName("waitingFrame");

    // display the loading div in the module
    Element.insert($(moduleId), { bottom: module_controller.createLoadingDiv() });

  },


  /**
   * Indicate that the given view has finished loading. If all the views in the module
   * are complete, then display them.
   *
   * @param moduleId  The id of the module
   * @param viewId    The id of the view that is finished loading
   */
  registerViewComplete: function(moduleId, viewId) {

    var viewTracker = this.modules.get(moduleId);

    viewTracker.set(viewId, true);

    if (viewTracker.values().all()) {

      // add the refresh time to the module
      var lastUpdated = !notification_controller.refreshDate ?
                        "" :
                        notification_controller.getResource("nautilus.view.lastUpdated") + " " +
                        notification_controller.refreshDate;

      $(moduleId).getElementsBySelector("div.portletInfoFooter").first().innerHTML = lastUpdated;

      // get rid of the "waiting" div and its associated background styling
      $(moduleId).down().next().remove();
      $(moduleId).removeClassName("waitingFrame");

      // display the module's contents
      $(moduleId).down().show();

    }

  },


  /**
   * Resets the "loaded" status of all registered modules to false, and displays
   * the loading page in each
   */
  resetModules: function() {

    // reset all the view statuses
    this.modules.values().each(function(viewTracker) {
      viewTracker.keys().each(function(key) {
        viewTracker.set(key, false);
      });
    });

    // hide the views and display the loading page
    this.modules.keys().each(function (moduleId) {
      $(moduleId).down().hide();
      $(moduleId).addClassName("waitingFrame");
      Element.insert($(moduleId), { bottom: module_controller.createLoadingDiv() });
    });

  },

  /**
   * Displays the given error message in all nautilus modules on the page
   */
  displayErrorMessage: function(errorMessage) {

    this.modules.keys().each(function (moduleId) {

      // get rid of the "waiting" div
      if($(moduleId)) {

        $(moduleId).down().next().remove();

        // ... and display the error message
        var errorMessageDiv =
          Builder.node("div", {style: "margin-top: 100px; margin-left: 20px; margin-right: 20px; text-align: center" }, errorMessage);

        Element.insert($(moduleId), { bottom: errorMessageDiv });
      }

    });

  },

  /**
   * Creates a div with the "loading" indicator.
   */
  createLoadingDiv: function() {
    var altMsg = notification_controller.getResource("nautilus.loading.progress");
    return Builder.node("div", {style: "margin-top: 100px; margin-bottom: 100px; text-align: center" },
             Builder.node("img", {src: "/images/ci/misc/progress/progress_learningSystem.gif",
                                  alt: altMsg,
                                  width: "32px",
                                  height: "20px"}));

  }

};
/**
 * The base class for all views. It provides the following services:
 *
 * o Automatic registration with the model o Automatic response to notification &
 * actor callbacks from the model. o Several render utilities for creating
 * notifications and actors elements
 *
 * Extenders *must* override the buildView function to create their views. It is
 * called when all notifications have been loaded into the system.
 *
 */
if (!window.NautilusView) {


NautilusView = Class.create( {

  /**
   * Constructor.
   *
   * Valid view options include:
   *   :: hideCourses - whether to hide the course link that appears beside each notification
   *   :: hideCounts  - whether to hide the notification counts
   *
   * @param containerId  The id of the top-level container of this view
   * @param parentId     The id of the element that contains this view
   * @param viewOptions  various options that control the disposition of this view
   * @param renderAllNotificaitonsItems  Whether to show all items, even if their numbers exceeds the
   *                                     initial display threshold
   *
   */
  initialize: function(courseId, groupId, sourceIds, containerId, parentId, viewOptions, renderAllNotificationItems, noItemsMessage) {

    if (parentId) {

			this.courseId = courseId;
			this.groupId = groupId;
			this.sourceIds = sourceIds;
      this.viewId      = (NautilusView._viewCount++) + "-" + parentId;
      this.containerId = containerId;
      this.parentId    = parentId;
      this.viewOptions = viewOptions ? viewOptions : {};

      // initialize stuff
      this.expandedBlocks = [];
      this.expandedActors = $H();

      this.actorContainers = $H();
      this.actorRenderer = this.defaultActorRenderer;

      this.renderAllNotificationItems = renderAllNotificationItems;
      this.noItemsMessage = noItemsMessage;

      this.actionMenuId = null;

    }
    notification_controller.registerView( this );
  },


  /**
   * Display the view. Also register with the notification model.
   */
  display: function() {

    // if notifications have already finished loading, go ahead and build the
  // view
    if (notification_controller.getLoadStatus() == notification_controller.LOAD_COMPLETE ) {
      this.notificationsLoaded();
    }

  },

  /**
   * Creates the view. Extenders must override this function with thier own
   * implementations.
   */
  buildView: function() {
    alert("buildView not implemented");
  },

  /**
   * Deletes the contents of the view, and all of its blocks.
   */
  removeView: function() {
    $(this.parentId).down().remove();
    this.blocks = null;
  },

  /**
   * Specify a function that renders a notificaiton actor. The function should have the following
   * signature:
   *
   *   function(notification, actor menu)
   *
   * ... where "notification" is the notification to which the actor belong, "actor" is the
   * actor to be rendrered, and "menu" is the menu containing valid actions for that actor.
   * The function should return a node suitable for display within a list item (<li>).
   *
   * If no renderer is specified, the view will used the "defaultActorRenderer"
   * function.
   *
   * @see            defaultActorRenderer
   * @param renderer A function that renders a single notification actor
   * @return         An element containing the rendered actor
   */
  setActorRenderer: function(renderer) {
    this.actorRenderer = renderer;
  },

  /**
   * Returns an element that should follow the title in a notification element. If null,
   * renders nothing. This function should be overriden by child views.
   *
   * @param notification  The notification we're rendering
   * @param displayActors Whether this notification has associated actors
   */
  getNotificationTitleDecorator: function(notification, displayActors) {
    return null;
  },


  /**
   * The renderer we use to display notifications, by default. This can be overriden.
   *
   * @param notification   The notification to render
   * @param menu           The action menu for that notification
   * @param hasActors      Whether this notification has associated child actors
   * @return               An element containing the rendered notification
   */
  renderNotificationItem: function(notification, menu, hasActors) {

    var defaultAction = notification_controller.getDefaultAction(notification.viewId);

    // the elements that go into a notification entry
    var elements = [];

    if (defaultAction) {
      var actionHandler = "nautilus_utils.actionSelected('" + notification.viewId + "', '" + defaultAction.actionKey + "', true)";
      elements.push(Builder.node("a", {onclick: actionHandler, href: "javascript:void(0)" }, notification.title));
    }

    else {
      elements.push(notification.title);
    }

    elements.push(" ");

    // add any decorators that should follow the title
    var titleDecorator = this.getNotificationTitleDecorator(notification, hasActors);
    if (titleDecorator)
    {
      elements.push(titleDecorator);
    }

    elements.push(" ");
    // add the notification menu
    elements.push(menu);

    // display the name of the associated course (if this capability hasn't been
  // suppressed by our caller),
    // and a link to that course
    if (!this.viewOptions.hideCourses) {
      elements.push(" ");
      elements.push(this.renderNotificationItemCourse(notification));
    }

    return(Builder.node("span", elements));

  },


  /**
   * Render the notification item course line, which appears under the notification item.
   *
   * @param notification The notification in questions
   */
  renderNotificationItemCourse: function (notification) {

    // show the course name, and link to that course
    return Builder.node("div", {className: "course"},
             Builder.node("a", { target: "_top", href: notification_controller.getCourseLink(notification.courseId) },
                          notification.courseName));

  },



  /**
   * The renderer we use to display notification actors, by default. This can be overriden.
   *
   * @see                setActorRenderer
   * @param notification The notification to which the actor belongs
   * @param actor        The actor to render
   * @param menu         The action menu for that actor
   * @return             An element containing the rendered actor
   */
  defaultActorRenderer: function(notification, actor, menu) {
    return Builder.node("span", [actor.name, " ", menu]);
  },

  getExpandCollapseAlt : function ( isVisible, imgAlt )
  {
    // Change the title
    var expandStr = notification_controller.getResource("nautilus.view.expand","");
    var collapseStr = notification_controller.getResource("nautilus.view.collapse","");

    var title = "";
    if ( isVisible )
    {
      title = imgAlt.replace(expandStr,"");
      return notification_controller.getResource("nautilus.view.collapse",title);
    }
    else
    {
      title = imgAlt.replace(collapseStr,"");
      return notification_controller.getResource("nautilus.view.expand",title);
    }

  },
  /**
   * Show/hide the container that contains actors lists for a the given notification. If the
   * container has not yet been created, calls out to the model to grab the actors and
   * creates it.
   *
   * @param notificationId       The id whose notifications we seek
   * @param block
   * @param suppressRegistration If true, suppresses registration of the expansion
   *                             state with the underlying server
   */
  toggleActorContainer : function(notificationId, blockId, suppressRegistration) {

    var container = this.actorContainers.get(notificationId);

    var notificationEntryId = this._getNotificationElementId(notificationId);

    // if we've already created this action container, just toggle it
    if (container) {
      container.toggle();
    }

    // create the actor container then kick off an actor load request
    else {

      var actorListId =  this._getActorListElementId(notificationId);

      // create the actor container and register it with this view
      container = $(Builder.node("div", { id: this._getActorListElementId(notificationId)}));
      this.actorContainers.set(notificationId, container);

      // grab all the actors for this notification
      var actors = notification_controller.getActors(notificationId, this.blocks[blockId].actorKind);

      // if they've already been loaded, render and display them
      if (actors != notification_controller.LOAD_IN_PROGRESS) {
        var actorsList = this.createActorList(actors, notification_controller.getNotification(notificationId));
        container.appendChild(actorsList);
      }

      // place the actor container beneath its parent notification
      $(notificationEntryId).appendChild(container);

    }

    // toggle the expansion image
    var expansionImg = $(this._getExpansionImageId(notificationId));
    expansionImg.src = container.visible() ? "/images/ci/icons/minus.gif" : "/images/ci/icons/plus.gif";

    expansionImg.alt = this.getExpandCollapseAlt ( container.visible(), expansionImg.alt );
    expansionImg.parentNode.title = this.getExpandCollapseAlt ( container.visible(),  expansionImg.parentNode.title );

    // register the expansion state of the actor list
    if (!suppressRegistration) {
      this._registerExpansion
        (this._getActorExpansionStateId(notificationEntryId), container.visible());
    }

  },

  /**
   * Show/hide the discussion board container that contains actors lists for a the given notification.
   * If the container has not yet been created, calls out to the model to grab the actors and creates it.
   *
   * @param blockId        The id of the block
   * @param notificationId The id of the notification within the block
   * @param suppressRegistration If true, suppresses registration of the expansion
   *                             state with the underlying server
   */
  toggleGenericBlockActorContainer : function(blockId, notificationId, suppressRegistration) {

    var container = this.actorContainers.get(notificationId);

    var notificationEntryId = blockId + notificationId + "Li";
    var notificationDivId = blockId + notificationId + "Div";
    var notificationImgId = blockId + notificationId + "Img";

    // if we've already created this action container, just toggle it
    if (container) {
      container.toggle();
    }

    // load the actor container HTML block
    else {

      // create the actor container and register it with this view
      container = $(notificationDivId);
      container.toggle();
      this.actorContainers.set(notificationId, container);

    }

    // toggle the expansion image
    var notificationImg = $(notificationImgId);
    notificationImg.src = container.visible() ? "/images/ci/icons/minus.gif" : "/images/ci/icons/plus.gif";

    notificationImg.alt = this.getExpandCollapseAlt ( container.visible(), notificationImg.alt );
    notificationImg.parentNode.title =  this.getExpandCollapseAlt ( container.visible(), notificationImg.parentNode.title );

    // register the expansion state of the actor list
    if (!suppressRegistration) {
      this._registerExpansion(this._getActorExpansionStateId(notificationEntryId), container.visible());
    }

  },


  /**
   * Hides/shows the given category's block.
   *
   * @param blockId The id of the block to toggle
   * @param expand  A boolean indicating whether to expand (true) or collapse. If null,
   *                we'll simply toggle the block to the state opposite to its current
   *                disposition
   * @param suppressRegistration If true, suppresses registration of the expansion state
   *                             with the underlying server
   */
  toggleBlock: function(blockId, expand, suppressRegistration, blockIndex) {

    var blockListId = this._getBlockListId(blockId);
    var blockList   = $(blockListId);
    var blockHeader = $(this._getBlockHeaderElementId(blockId));
    var blockImg    = $(this._getBlockImgElementId(blockId));

    // if the user just wants a straight toggle, figure out which way to go
    if ( expand === null || expand === undefined )
    {
      expand = !blockList.visible();
    }

    if (expand) {
      blockHeader.addClassName("itemHeadOpen");
      blockList.show();
      blockImg.alt = notification_controller.getResource("nautilus.view.expand","");

    }
    else {
      blockHeader.removeClassName("itemHeadOpen");
      blockList.hide();
      blockImg.alt = notification_controller.getResource("nautilus.view.collapse","");
    }

    // register the expansion state of the block
    if (!suppressRegistration)
    {
      this._registerExpansion(blockListId, blockList.visible());
    }
    if (blockIndex !== null &&  blockIndex === 0 )
    {
      blockHeader.focus();
    }
  },


  /**
   * Expand/collapse all blocks in the view.
   *
   * @param expand If true, expands all. If false, collapses.
   */
  toggleAllBlocks: function(expand) {
    $H(this.blocks).values().each(
        function (block, index)
        {
          this.toggleBlock(block.id, expand, false, index) ;
        }.bind(this)
    );
  },


  // ----- callbacks

  notificationsLoaded: function() {

    // init
    this.expandedBlocks = [];
    this.expandedActors = $H();
    this.actorContainers = $H();

    // render the view
    this.buildView();

    // expand all blocks that were expanded last time the user was in this view
      this.expandedBlocks.each(function(blockId) {

        this.toggleBlock(blockId, true, true);

        // expand all actors lists within this pre-expanded block
        if (this.expandedActors.get(blockId)) {

          var block = this.blocks[blockId];

          if (block instanceof nautilus_utils.GenericBlock) {

            this.expandedActors.get(blockId).each(function(notificationId) {
              this.toggleGenericBlockActorContainer(blockId, notificationId, true);
            }.bind(this));

          }

          else {
            this.expandedActors.get(blockId).each(function(notificationId) {
              this.toggleActorContainer(notificationId, block.id, true);
            }.bind(this));
          }

        }
    }.bind(this));

    // let the parent module controller know that this view is finished
    module_controller.registerViewComplete(this.containerId, this.viewId);

  },

  /**
   * Called  when all notifications have been removed from the model underlying this view.
   */
  notificationsUnloaded: function() {
    this.removeView();
  },


  /**
   * Called when a pending actor request is complete.
   *
   * @param notificationId  The notification to which the actors belong
   * @param actors          The actors
   */
  actorsLoaded: function(notificationId, actors) {

    var container = this.actorContainers.get(notificationId);

    if (actors && container) {
      container.appendChild( this.createActorList(actors, notification_controller.getNotification(notificationId)) );
    }
  },


  /**
   * Called when a pending actor removal request is complete.
   *
   * @param actorId  The id of the actor that was removed.
   */
  actorRemoved: function(actorId) {
    var elementId = this._getActorElementId(actorId);
    if ( $(elementId) ) {
      $(elementId).remove();
      // new Effect.Highlight(elementId, { duration: 0.3, afterFinish:
    // function(obj) { $(elementId).remove() }});
    }

  },


  /**
   * Reacts to the removal of notifications. Deletes the notifications, updates counts,
   * and makes any necessary changes to the surrounding block structure.
   *
   * @param notificationViewId The notification that was removed
   */
  notificationRemoved: function(notificationViewId) {

    var elementId = this._getNotificationElementId(notificationViewId);
    var notification = $(elementId);

    if ( notification ) {

      var blockList = notification.up("ul");
      var blockElement = $(elementId).up("div");

      notification.remove();

      // figure out which block we're in
      var blockId = blockList.id.split(":::::").last();
      var block = this.blocks[blockId];

      // get the element that contains the block count
      var countElement = $(this._getBlockCountId(blockId));

      // if there are still notifications in this block, update the count
      if (blockList.down()) {

        // parse out the number
        /(\d+)/.exec(countElement.innerHTML);
        var count = parseInt(RegExp.$1, 10);

        // ... and update it
        countElement.innerHTML = " (" + (count - 1) + ")";

      }

      // no notifications left; if this block is marked to never disappear,
      // set the count to zero and display the empty msg
      else if (block.alwaysDisplay) {

        countElement.innerHTML = " (0)";

        var emptyBlockNode = $(this.renderNoNotificationsMsg(block.noNotificationsMsg));
        var blockContainer = blockElement.up();

        blockElement.remove();
        blockContainer.appendChild(emptyBlockNode);

      }

      // otherwise delete the block
      else {

        // get the main container for all the blocks
        var blocksContainer = blockElement.up("div");

        blockElement.up().remove();

        // if there aren't any more blocks left, put up the "no notifications"
    // msg
        if (!blocksContainer.down(2)) {

          // replace the blocks with a "no notifications" msg
          blocksContainer.down().remove();
          blocksContainer.appendChild(this.renderNoNotificationsMsg());

        }

      }

    }
  },


  // ----- renderering

  /**
   * Renders a view, consisting of one or more blocks. If the incoming list is
   * null, instead renders a standard "no notifications" message.
   *
   * @param blocks
   *            An array of NautilusBlock objects
   * @param sort
   *            Whether to sort the blocks alphabetically, by block name
   * @return All rendered blocks, in the form of an unordered list
   */
  renderNotificationView : function(blocks, sort) {

    // if there's nothing to display, say so
    if (!blocks || blocks.length === 0) {
      return this.renderNoNotificationsMsg();
    }

    // otherwise, build the list of blocks
    else {

      this.blocks = {};

      blocks.each(function(block) {
        this.blocks[block.id] = block;
      }.bind(this));

      // sort the incoming list by block name, if requested
      if (sort) {

        // convert the incoming list of blocks into a hash indexed by block name, so we
        // can sort
        var blockMap = $H();
        blocks.each(function(block) {blockMap.set(block.name, block);});
        blocks = blockMap.keys().sort().collect(function(name) { return blockMap.get(name); });
      }

      var list = Builder.node("ul", {className : "blockGroups"});

      // render the blocks
      blocks.each( function(block, index) {

        var blockItem = Builder.node("li", {id: this._getBlockElementId(block.id)});
        list.appendChild(blockItem);

        var header = this.renderBlockHeader(block, index === 0);

        var blockElement = null;

        if (block instanceof nautilus_utils.NotificationBlock) {
          blockElement = this.renderNotificationBlock(block, this.renderAllNotificationItems);
        }

        else if (block instanceof nautilus_utils.GenericBlock) {
          blockElement = this.renderGenericBlock(block);
        }

        var blockDiv = Builder.node("div", [header, blockElement]);

        blockItem.appendChild(blockDiv);

      }.bind(this));

      return list;

    }

  },


  renderBlockHeader : function(block, first) {

    var headerId = this._getBlockHeaderElementId(block.id);
    var headerContents = [block.name]; // blockName surround with "a" link tag
                    // to make it accessible
    var notificationCount;
    if (!this.viewOptions.hideCounts) {
      headerContents.push(" ");
      headerContents.push(notificationCount =
        Builder.node("span", {className: "newItemCount", id: this._getBlockCountId(block.id)}, "(" + block.numItems + ")"));
    }


    // add an invisible image with alt text describing the expand/collapse capabilities
    // of the block; this is for screen readers
    var expandMsg = notification_controller.getResource("nautilus.view.expandBlockTooltip");


    headerContents.push(Builder.node("img", {id:  this._getBlockImgElementId(block.id),
                                             src: "/images/spacer.gif",
                                             className: "hideoff",
                                             alt: expandMsg }));

    var header = Builder.node("span", { id: headerId,
                                        tabindex: "0",
                                        onclick: "nautilus_utils.toggleBlock('" + this.viewId + "', '" + block.id + "')",
                                        style: "cursor: pointer",
                                        className: "itemHead" //,
                                       // onfocus: "this.style.backgroundColor='#FF9';",
                                        //onblur: "this.style.backgroundColor='';"
                                        }, "" );

    Event.observe( header, 'keypress', this.headerToggle.bindAsEventListener( this, block ));

    // the first block doesn't have a top border -- we rely on the container to
    // provide that
    if (first)
    {
      $(header).setStyle ( {borderTop: "0"} );
    }

    var headerText = Builder.node(
      "span",
      {id: ("headerText" + headerId),
       className: "headerText"
      },
      headerContents);

    // Need to add the text before the context menu for Keyboard access
    header.appendChild(headerText);
    var confirmationMsg = notification_controller.getResource("nautilus.view.blockClearConfirmationMsg");

    // if this block contains notifications and the current user isn't an observer, include a block-level
    // "clear notifications" menu
    if ( block instanceof nautilus_utils.NotificationBlock && !notification_controller.isObserver ) {

      // create the anchor for the block clear menu
      var clearMenu = this._createContextMenu("contextMenu::" + headerId,block.name);

      // ... and listen for a click
      Event.observe(clearMenu, "click", function(event) {

        // note: Event.pointerX() is not working reliably in IE, so we have to use
        // browser-specific code in the code below
        this.displayMenu([{viewId: this.viewId}], clearMenu.id, function(item) {

          var menuItem = Builder.node("a",
            {href: "javascript:nautilus_utils.clearBlockNotifications('" + item.viewId + "', '" + block.id + "', '" + confirmationMsg.replace(/'/g, '\\\'') + "');nautilus_utils.onCloseLinkClick()",
             style: "cursor: pointer"},
             notification_controller.getResource("nautilus.view.clearAll"));

          var listElement = this.appendChild(Builder.node("li"));
          listElement.appendChild(menuItem);
        });

        // prevent the click event from propagating up to the titlebar
        Event.stop(event);

      }.bind(this));

      $(clearMenu).setStyle({cssFloat: 'right'});

      header.appendChild(clearMenu);
      header.appendChild(document.createTextNode(' ')) ;

    }
    return header;
  },

  headerToggle : function ( event, block )
  {
    var elem = Event.element( event );
    if ( event.element().up("span") === null )
    {
      if(event.keyCode== Event.KEY_RETURN ||event.keyCode==32)
      {
        nautilus_utils.toggleBlock(this.viewId , block.id );
      }
    }
  },

  renderGenericBlock : function(block) {

    // grab the contents of the block
    var genericBlockList = $(block.contentsId);

    // change the id of the the standard one for a block list
    genericBlockList.id = this._getBlockListId(block.id);
    block.contentsId = genericBlockList.id;

    return genericBlockList;

  },


  /**
   * Renders the contents of a single block.
   *
   * @param block                       The notification block to be rendered
   * @param renderAllNotificationItems  Flag indicating whether to display all notification items even if
   *                                    there are more than the initial-display thresshold
   * @return                            A list of notifications, rendered as an html list
   */
  renderNotificationBlock : function(block, renderAllNotificationItems) {

    var notificationsCount = $(block.numItems);
    var blockListId        = this._getBlockListId(block.id);


    var blockNode;

    // if there are no notifications in this block, render a "no notifications"
    // message
    if (notificationsCount === 0) {
      blockNode = $(this.renderNoNotificationsMsg(block.noNotificationsMsg));
      blockNode.setAttribute("id", blockListId);
      blockNode.setStyle( {display: "none"} );
    }

    // otherwise, render each notification
    else {

      var blockClass = "itemGroups" + (block.showActors ? " hierarchyList" : "");

      blockNode = Builder.node("ul", {id: blockListId, className : blockClass, style: 'display: none'});

      // if there are too many notifications to render, display a message
    // instead
      if (!renderAllNotificationItems && (notificationsCount > NautilusView.NOTIFICATION_OVERFLOW_THRESHOLD)) {
        blockNode.appendChild(this.buildExceedNotificationCountsItem(block));
      }

      // otherwise, display all notifications
      else {

        block.notifications.each( function(notification) {
          blockNode.appendChild(this.renderNotification(notification, block));
        }.bind(this));
      }

    }

    // if this block was open last time we were in here, open it up
    if (this._isExpanded(blockListId))
    {
      this.expandedBlocks.push(block.id);
    }

    return blockNode;

  },


  /**
   * Generate a message indicating no notifications were available.
   *
   * @param  msg The message to render. If null, default to the standard msg
   * @return A node containing the message.
   */
  renderNoNotificationsMsg: function(msg) {

    if (!msg)
    {
      msg = notification_controller.getResource("nautilus.view.noNotifications");
    }

    return Builder.node("p", {className: "noItems"}, msg);

  },

  /**
   * Renders the contents of a single block displaying there are more than 25 notification items.
   *
   * @param block The block containing more than 25 notifications
   * @return        An item containing message rendered as an html content
   */
  buildExceedNotificationCountsItem : function(block) {

    var itemId = this._getNotificationElementId(0);
    var item = Builder.node("li", {id: itemId, style: "text-align: center"});

    // add the overflow message
    var overflowMessage =
      notification_controller.getResource
        ("nautilus.view.notificationOverflow").replace("{num}", block.numItems);

    var elements = [overflowMessage];

    // what to do when the user asks to see everything
    var showAllAction =
      "nautilus_utils.renderNotificationBlockFromExceedItem('" + this.viewId + "', '" + block.id + "')";

    // what to do when the user asks to clear everything
    var clearConfirmationMsg = notification_controller.getResource("nautilus.view.blockClearConfirmationMsg");

    var clearAllAction =
      "nautilus_utils.clearBlockNotifications('" + this.viewId + "', '" + block.id + "', '" + clearConfirmationMsg.replace(/'/g, '\\\'') + "')";

    // the links for the above actions
    elements.push(Builder.node("div", {style: "padding-top: 10px"},
      [Builder.node("a", { href: "javascript:void(0)", onclick: showAllAction}, notification_controller.getResource("nautilus.view.showAll")),
       Builder.node("a", { href: "javascript:void(0)", onclick: clearAllAction, style: "padding-left: 14px;"}, notification_controller.getResource("nautilus.view.clearAll"))
      ]
    ));

    // append the elements to the item
    item.appendChild(Builder.node("span", elements));

    return item;
  },

  /**
   * Renders a single notification entry.
   *
   * @param notification The notification to render
   * @param block        The block to which it belongs
   */
  renderNotification: function(notification, block) {

    var itemId = this._getNotificationElementId(notification.viewId);
    var item = Builder.node("li", {id: itemId});

    // if the notifications in this block have child actors, and we're
  // displaying them, build
    // a list expansion widget thingy
    if (block.showActors) {

      var altStr = notification_controller.getResource("nautilus.view.expand", notification.title );
      var toggleIcon =
        Builder.node("a", {title:altStr, href:"javascript:void(0)", onclick: "nautilus_utils.toggleActors('" + this.viewId + "', '" + notification.viewId + "', '" + block.id + "')"},
          Builder.node("img", { id: this._getExpansionImageId(notification.viewId), src : "/images/ci/icons/plus.gif",alt:altStr  } ));

      item.appendChild(toggleIcon);

      // if this actor list was expanded the last time the user was in this
    // view,
      // arrange for it to be re-expanded after we finish building ourselves
      if ( this._isExpanded(this._getActorExpansionStateId(itemId)))
      {
        if (!this.expandedActors.get(block.id))
        {
          this.expandedActors.set(block.id,[]);
        }
        this.expandedActors.get(block.id).push(notification.viewId);
      }

    }

    // create the menu anchor, and listen for a click
    var menu = this._createContextMenu("nmenu::" + itemId + block.id, notification.title );

    Event.observe(menu, "click", function(event) {
      nautilus_utils.displayNotificationActionMenu
        (this.viewId, notification.viewId, block, menu.id);

        //Prevent click from bubbling up triggering default browser 'jump-to-anchor' behavior
        Event.stop(event);
    }.bind(this));

    // create this notification entry
    item.appendChild(this.renderNotificationItem(notification, menu, block.actorKind));

    return item;

  },

  /**
   * Renders the contents of a single notification block containing more than 25 notification items.
   *
   * @param viewId  Unique id of the Notification Container
   * @param blockId Unique Id of the block containing more than 25 notifications
   */
  renderNotificationBlockFromExceedItem : function(viewId, blockId) {
    // get the list of all blacks for the passed in container id
    var blocks = notification_controller.notificationContainers[viewId].blocks;

    // get the block form the list of blocks
    var myBlock = blocks[blockId];

    // get the notification block even if more than 25 items
    var blockElement = this.renderNotificationBlock(myBlock, true);

    // get the HTML Object for the specific div containing notification
    var blockDiv = $(this._getBlockElementId(myBlock.id)).down();

    // remove the child that displays the message containing more than 25 items
    blockDiv.removeChild($(this._getBlockListId(myBlock.id)));

    // append the child containing notifications
    blockDiv.appendChild(blockElement);

    // toggle the notifications block list to show
    blockElement.show();

  },


  /**
   * Create the actor container for the given notification
   *
   * @param actors          The actors to place in the container
   */
  createActorList : function (actors, notification) {

    var list = Builder.node ("ul", {className: "memberList", style: "display: block"} );

    actors.each( function(actor) {

      // create the menu anchor, and listen for a click
      var menu = this._createContextMenu("amenu::" + actor.id);

      Event.observe(menu, "click", function(event) {
        this.displayActorActionMenu(actor, menu.id);
        Event.stop(event);
      }.bind(this));

      // call out to the renderer to display the actor
      list.appendChild(
        Builder.node ("li",
          {id: this._getActorElementId(actor.id)},
          this.actorRenderer(notification_controller.getNotificationByInternalId(actor.eudItemId), actor, menu)));

    }.bind(this));

    return list;

  },

  /**
   * Returns a context menu
   *
   * @param id  The id to give the context menu
   * @return    The context menu
   */
  _createContextMenu : function (id, title) {
    var altStr = notification_controller.getResource("nautilus.view.optionMenuTooltip");
    if ( title )
    {
      altStr =  notification_controller.getResource("nautilus.view.option", title);
    }

    return Builder.node("a", { id: id, className: "cmimg editmode", href: "#menuDiv", title:altStr },
        Builder.node("img", { id: "cmimg_" + id,
                              src : "/images/ci/icons/cm_arrow.gif",
                              alt: altStr }));
  },


  /**
   * Create a menu for manipulating the view as a whole.
   *
   * @param buttonId The id of the button to which this menu should be attached
   */
  createViewMenu: function(buttonId) {

    var localButtonId = buttonId;
    // if the model isn't finished loading yet, we don't have enough info to
    // create the menu; register with the model, so that it'll inform us when
    // the load is complete
    if (notification_controller.getLoadStatus() != notification_controller.LOAD_COMPLETE) {

      notification_controller.registerLoadListener({
        loadComplete : function() {
          if (!this.actionMenuId)
          {
            this.createViewMenu(localButtonId);
          }
        }.bind(this)
      });

    }

    else {

      var viewPrefix = "notification_controller.notificationContainers['" + this.viewId + "'].";

      // add actions for category expansion and collapse
      var actors = [
        {title: notification_controller.getResource("nautilus.view.expandAll"),   href: "javascript: " + viewPrefix + "toggleAllBlocks(true)"},
        {title: notification_controller.getResource("nautilus.view.collapseAll"), href: "javascript: " + viewPrefix + "toggleAllBlocks(false)"}
      ];

      // if the current user is not an observer, add a clear all action as
    // well
      if (!notification_controller.isObserver) {

        actors.push
          ({title: notification_controller.getResource("nautilus.view.clearAll"),
            href: "javascript: nautilus_utils.clearAllNotifications('" +
                    this.viewId + "', '" + notification_controller.getResource("nautilus.view.viewClearConfirmationMsg").replace(/'/g, '\\\'') + "')"});
      }

      // add a "refresh" option that reloads notifications, clearing the cache
      actors.push ( {title: notification_controller.getResource("nautilus.view.refresh"), href: "javascript:notification_controller.refreshNotifications()"} );

      // create the action menu, and remember that we did so
      this.actionMenuId = this.createActionMenu(actors, buttonId);

    }

  },

  /**
   * Creates a menu with the given set of actions. If a buttonId is provided, associated the
   * menu with the given button. Otherwise, creates the associated menu button and returns
   * a div containing both menu & button.
   *
   * @param actions   The action to include in the menu
   * @param buttonId  The id of the button to associate the menu to
   * @return          The id of the created menu
   */
  createActionMenu: function(actions, buttonId) {

    var actionButtonId = buttonId ? buttonId : "actionButton_" + NautilusView._actionMenuCount;
    var actionMenuId   = "actionMenu_" + NautilusView._actionMenuCount++;

    var hideActionMenu = "$('" + actionMenuId + "').setStyle({display: 'none'})";
    var actionsLabel   = notification_controller.getResource("nautilus.view.actions");

    var button = buttonId ? $(buttonId) :
      Builder.node("a", { href: "#", id: actionButtonId, className: "actionMenuButton"},
                    [actionsLabel, " ", Builder.node("img", { src : "/images/ci/ng/more_options.gif" } ) ]);

    // Always set the href as an anchor to the Menus; Href are set in the JSP pages
    button.href = "#"+actionMenuId;

    var menuMouseOver = function() {nautilus_utils.displayActionMenu(actionButtonId, actionMenuId); };

    // the function to call when a mouseout event is fired around the menu;
    // we can't just hide the menu, because of the mouseout is fired whenever
    // the pointer enters an element *within* the menu div; in these cases, we
    // obviously don't want to close the menu; so we have to check every time
    // to make sure that the menu div isn't somewhere in our parent chain;
    // just really annoying. IE has a "mouseleave" event that doesn't bubble,
    // but there's no analog anywhere else. hence the nastiness below.
    var menuMouseOut  = function(e) {

      // figure out where the mouse is sitting after the mouse out event
      var destination = (e.relatedTarget) ? e.relatedTarget : e.toElement;

      // if it's not still inside the menu, hide the menu
      if (destination === null || destination.id != actionMenuId && !$(destination).up("div#" + actionMenuId)) {
        $(actionMenuId).setStyle({display: "none"});
      }

    };

    // create the contents of the menu
    var list = Builder.node("ul", {style: "border-top: 1px solid; border-color: #ACC2DF"});

    // create each menu item
    actions.each(function(action) {
      var link = Builder.node("a", { href: "javascript:void(0)", style: "cursor: pointer", onclick: action.href + ";" + hideActionMenu}, action.title);
      link.setAttribute( "role", "menuitem" );
      var ac = Builder.node("li", link);
      list.appendChild( ac );
      link.parentNode.setAttribute( "role", "presentation" );
    });

    // create the shell into which we'll slide the menu
    var menu = Builder.node("div",  {id: actionMenuId,  className: "cmdiv"}, list);

    // add open/close menu handlers
    Event.observe(button, "mouseover", menuMouseOver);
    Event.observe(button, "mouseout", menuMouseOut);
    Event.observe(menu, "mouseout", menuMouseOut);
    list.setAttribute( "role", "menu" );
    // Add Key Press action for the menu
    Event.observe( button, 'keydown', this.onActionButtonKeyPress.bindAsEventListener( this, actionButtonId, actionMenuId ));
    Event.observe( button, 'click', this.onLinkOpen.bindAsEventListener( this, actionButtonId, actionMenuId ));
    Event.observe( menu, 'keydown', this.onKeyPressFn.bindAsEventListener( this, actionButtonId, actionMenuId ));

    window.document.body.appendChild(menu);

    return actionMenuId;

  },

  /**
   * Display the action menu for the given notification
   *
   * @param notificationId The notification to display for
   * @param block          The block that this notification lives  in
   * @param parentButtonId The id of the button that invokes the menu
   */
  displayNotificationActionMenu : function(notificationId, block, parentButtonId) {

    var actions = notification_controller.getNotificationActions(notificationId);

    // display the action menu; automatically include a "remove" item if this
  // notifications
    // doesn't contain child actors
    this.displayMenu((block.showActors ? actions : [actions, {removeId: notificationId}].flatten()), parentButtonId, function(item) {

      var menuItem;

      // if this is not the standard "remove" menu item
      if (item.removeId === undefined) {
        menuItem = Builder.node("a",
          {onclick: "nautilus_utils.actionSelected('" + notificationId + "', '" +
                      item.actionKey + "', false, 'menuDiv')", href: "javascript:void(0)" }, item.actionName);
      }

      // otherwise render the remove item, but only if the current user is not an observer
      else if (!notification_controller.isObserver) {

        // if this notification represents multiple actors, then remove *all* of them
        if (block.actorKind) {

          menuItem = Builder.node("a", {
            onclick: "nautilus_utils.removeNotificationActorsForUser('" + item.removeId + "', 'menuDiv')",
            href: "javascript:void(0)"
          }, notification_controller.getResource("nautilus.view.remove"));

        }

        // otherwise, just remove the current notification
        else {

          menuItem = Builder.node("a", {
            onclick: "nautilus_utils.removeNotification('" + item.removeId + "', 'menuDiv')",
            href: "javascript:void(0)"
          }, notification_controller.getResource("nautilus.view.remove"));

        }

      }

      if (menuItem !== undefined) {
        // ... and add it to the list
        var listElement = this.appendChild(Builder.node("li"));
        listElement.appendChild(menuItem);
    }
    });

  },

  displayActorActionMenu: function(actor, parentMenuId) {

    var actions = notification_controller.getActorActions(actor.id);
    var viewId = this.viewId;

    this.displayMenu([actions, {actionKey: "EMAIL", actionName: notification_controller.getResource("nautilus.view.email")}, {removeId: actor.id}].flatten(), parentMenuId, function(item) {

      var menuItem;

      // create the remove menu item
      if (item.removeId && !notification_controller.isObserver) {
        menuItem = Builder.node("a",
          {onclick: "nautilus_utils.removeActor('" + viewId + "', '" + item.removeId + "', 'menuDiv')", href: "javascript:void(0)" },
           notification_controller.getResource("nautilus.view.remove"));
      }

      // create the menu item
      else {

        menuItem = Builder.node("a",
          {onclick: "nautilus_utils.actorActionSelected('" + actor.id + "', '" + item.actionKey + "', 'menuDiv')", href: "javascript:void(0)" },
          item.actionName);
      }

      if (menuItem !== undefined) {
        // ... and add it to the list
        var listElement = this.appendChild(Builder.node("li"));
        listElement.appendChild(menuItem);
      }

    });

  },

  /**
   * Remove the actor with the given id from this view.
   *
   * @param actorId  The actor with the given id
   */
  removeActor: function(actorId) {
    notification_controller.removeActor(actorId);
  },

  displayMenu: function(actions, parentButtonId, menuBuilder) {

    var menuDiv = $("menuDiv");

    if (!menuDiv) {

      // create the div that contains the menu
      menuDiv = Builder.node("div", {id: "menuDiv",
                                     className: "cmdiv",
                                     style: "display: 'none'; z-index: 200; position: 'absolute'"});

      // create the menu header (contains close link)
      var closeMsg = notification_controller.getResource("nautilus.view.menu.close");
      var menuHeader = Builder.node("ul",
                       Builder.node("li", {id: "contextmenubar_top", className: "contextmenubar_top"},
                       Builder.node("a", {href: "javascript:nautilus_utils.onCloseLinkClick()"},
                       Builder.node("img", {src: "/images/ci/ng/close_mini.gif", alt: closeMsg }))));

      menuDiv.appendChild(menuHeader);
      window.document.body.appendChild(menuDiv);

    }
    /* Add Keyboard listening */
    Event.observe( menuDiv, 'keydown', this.onKeyPressFn.bindAsEventListener( this, parentButtonId, "menuDiv" ));
    // Reinitialize the contextmenu by clearing out menu items from it's last use.
    // Note: The first item in the context menu is the top row which contains
    // the close button.
    // When we clear out the menuitems, clear out rows after the close button
    // row only.
    $(menuDiv).getElementsBySelector("ul > li").each( function (menuItem )   {
      if (menuItem.id != 'contextmenubar_top')
      {
        menuItem.remove();
      }
    });

    // create a list
    var list = menuDiv.down();

    // now run through each action, creating a menu item for it
    actions.each( menuBuilder.bind(list) );

    // add close content menu button javascript handler
    var contextMenuBarTopRow = $('contextmenubar_top');

    menuDiv.setStyle( { display: "block" });

    var parentButton = $(parentButtonId);
    var buttonPos = parentButton.cumulativeOffset();

    // the scroll position of the button, relative to its containing module
    var scrollOffset = parentButton.cumulativeScrollOffset();
    if (!scrollOffset)
    {
      scrollOffset = [0, 0];
    }

    // the scroll position of the parent module, relative to the document as a
    // whole
    var containerScrollOffset = $(this.containerId).up().cumulativeScrollOffset();
    if (!containerScrollOffset)
    {
      containerScrollOffset = [0, 0];
    }

    var buttonDimensions = parentButton.getDimensions();

    var bodyWidth = $(document.body).getWidth();
    var menuWidth = menuDiv.down().getWidth();

    var isRTL = page.util.isRTL();
    var overbounds = isRTL ?
      buttonPos[0] + parentButton.getWidth() - menuWidth < 0 : buttonPos[0] + menuWidth > bodyWidth;

    // if we're in right-to-left locale, or we're right up against the right
  // edge of
    // the browser, orient the menu leftwards
    if ( ( isRTL && !overbounds) || ( !isRTL && overbounds ) ) {
      buttonPos[0] = (buttonPos[0] - menuWidth + parentButton.getWidth() + (Prototype.Browser.IE ? 2 : 3));
    }

    // otherwise we're left-to-right, or butting up against the far left edge of the browser
    else {
      buttonPos[0] = (buttonPos[0] + (Prototype.Browser.IE ? 2 : 0));
    }

    // position the menu below the parent action button
    menuDiv.setStyle( { top:  ((buttonPos[1] - scrollOffset[1]) + containerScrollOffset[1] + (buttonDimensions.height * 2) + 1) + "px",
                        left: buttonPos[0] + "px" });
    //Setting the focus after positioning the menu
    list.down("a").focus();

  },


  /**
   * Register the expansion state of the item specified by the given id. The state
   * will be retained for the duration of the user's browser session.
   *
   * @param id        The id of the item whose expansion state we're tracking
   * @param expanded  True if the item is expanded
   */
  _registerExpansion: function(id, expanded) {
    notification_controller.registerNodeExpansion(id, expanded);
  },


  /**
   * Whether the item specified by the given id should be expanded.
   *
   * @param id The id of the item we're asking about
   * @return   Whether it's expanded
   */
  _isExpanded: function(id) {
    return notification_controller.isNodeExpanded(id);
  },


  /**
   * Returns the id to use for notification elements constructed for the
   * given notification.
   *
   * @param notificationId  The id of the notification
   * @return                The appropriate id
   */
  _getNotificationElementId : function (notificationId) {
    return this.viewId + "::" + notificationId;
  },

  /**
   * Returns the id to use for actor elements construted for the given
   * actor.
   *
   * @param actorId The actor whose element we're creating
   * @return         The id to use
   */
  _getActorElementId : function (actorId) {
    return this.viewId + "::" + actorId;
  },

  /**
   * Returns the id to use for actors list constructed for the
   * given notification.
   *
   * @param notificationId  The id of the notification
   * @return                The appropriate id of the actor list
   */
  _getActorListElementId : function(notificationId) {
    return this._getNotificationElementId(notificationId) + "_actors";
  },

  /**
   * Returns the id to use for the notification expansion image.
   *
   * @param notificationId  The id of the notification
   * @return                The appropriate id
   */
  _getExpansionImageId: function(notificationId) {
    return "toggle::" + this.viewId + "::" + notificationId;
  },

  /**
   * Returns the id to use for a block header element
   *
   * @param blockId  The id of the block
   * @return         The appropriate id
   */
  _getBlockHeaderElementId: function(blockId) {
    return "header::" + this.viewId + "::" + blockId;
  },

  /**
   * Returns the id to use for the block header's expand/collpase
   * state image tag.
   *
   * @param blockId  The id of the block
   * @return         The appropriate id
   */
  _getBlockImgElementId: function(blockId) {
    return "header::img::" + this.viewId + "::" + blockId;
  },

  /**
   * Returns the id to use for the block counts.
   *
   * @param blockId  The id of the block
   * @return         The appropriate id
   */
  _getBlockCountId: function(blockId) {
    return this._getBlockHeaderElementId(blockId) + "::count";
  },

  /**
   * Returns the id to use for a block element
   *
   * @param blockId  The id of the block
   * @return         The appropriate id
   */
  _getBlockElementId: function(blockId) {
    return "block::" + this.viewId + "::" + blockId;
  },

    /**
   * Returns the id to use for the list of notifications in a block
   *
   * @param blockId  The id of the block
   * @return         The appropriate id
   */
  _getBlockListId: function(blockId) {
    return "blocklist::" + this.viewId + ":::::" + blockId;
  },

  /**
   * The identifier to use to store the expansion state of the given actor.
   *
   * @param   itemId An id that uniquely identifies the head of the actor list
   * @return  The expanansion state id
   */
  _getActorExpansionStateId : function(itemId) {
    return "actor::" + this.viewId + "::" + itemId;
  },

  onLinkOpen: function( event,actionButtonId, actionMenuId )
  {
   this.toggleOpen(event, actionButtonId, actionMenuId);
   Event.stop( event );
  },

  toggleOpen: function( event, actionButtonId, actionMenuId)
  {
     var menu = $(actionMenuId);
     if ( !menu.visible() || menu.style.display == ""  )
     {
       nautilus_utils.displayActionMenu(actionButtonId, actionMenuId);
       // Take the Focus to the first item in the list
       menu.down("li > a").focus();
     }
     else
     {
       menu.setStyle({display: "none"});
     }
 },

 onActionButtonKeyPress: function( event, actionButtonId, actionMenuId )
 {
   var elem = Event.element ( event );
   var key = event.keyCode || event.which;
   if  ( elem.id != actionButtonId )
   {
     return;
   }
   if ( key == Event.KEY_RETURN  )
   {
     this.toggleOpen(event, actionButtonId, actionMenuId);
     Event.stop( event );
   }
 },

 onKeyPressFn: function( event, buttonId, menuId )
 {
   var elem = Event.element ( event );
   var key = event.keyCode || event.which;
   if ( key == Event.KEY_UP )
   {
     var previousElement = elem.parentNode.previousSibling;
     if ( previousElement !== null )
     {
       previousElement.down("a").focus();
     }
     else
     {
       /* Take the focus to the last element */
       var menu = $(menuId);
       var list = menu.down("ul").childNodes;
       Array.from(list).last().down("a").focus();
     }
     Event.stop( event );
   }
   else if ( key == Event.KEY_DOWN )
   {
     var nxtEle = elem.parentNode.nextSibling;
     if ( nxtEle !== null )
     {
       nxtEle.down("a").focus();
     }
     else
     {
       /* Take the focus to the first element */
       var m1 = $(menuId);
       m1.down("li > a").focus();
     }
     Event.stop( event );
   }
   else if ( key == Event.KEY_LEFT )
   {
     Event.stop( event );
   }
   else if ( key == Event.KEY_RIGHT )
   {
     Event.stop( event );
   }
   else if ( key == Event.KEY_ESC )
   {
     $(menuId).setStyle({display: "none"});
     $(buttonId).focus();
     Event.stop( event );
   }
   else if ( key == Event.KEY_TAB )
   {
     /*Check if this is the last */
     var nextElement = elem.parentNode.nextSibling;
     if ( nextElement === null )
     {
       /* Close the Menu */
       $(menuId).setStyle({display: "none"});
       /*
         * Setting the focus back to the button to it can move to the next link,
         * if not the tab will take the focus to the starting of the page.
         */
       $(buttonId).focus();
     }
   }
  },

  disableLinksForPreview: function( containerId, viewId, intervalId )
  {
    /* check if the load is complete and the view has content */
    if ( notification_controller.getLoadStatus() == notification_controller.LOAD_COMPLETE
        && $( viewId ).innerHTML.trim().length > 0 )
    {
      TabLayoutModules.disableLinks( $( containerId ) );
      window.clearInterval( intervalId );
      this.toggleAllBlocks( true );
    }
  }

});

/**
 * A static variable that keeps counts of the number of views created. Used to
 * assign each view a unique id.
 */
NautilusView._viewCount = 0;

NautilusView._actionMenuCount = 0;

/**
 * A static constant variable that keeps the maximum count of the notification
 * items in the block
 */
NautilusView.NOTIFICATION_OVERFLOW_THRESHOLD = 100;

/**
 * The source type that identifies a survey notification
 */
NautilusView.SURVEY_SOURCE_TYPE = "SU";


}
