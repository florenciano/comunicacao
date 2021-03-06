/**
 * A set of utility functions for nautilus views.
 */
if (!window.ews_utils) {

var ews_utils = window.ews_utils = {


  toggleBlock: function(viewId, blockId) {
    var view = ews_model.ewsContainers.get(viewId);
    view.toggleBlock(blockId);
  },

  ewsActionSelected: function(notificationId, actionKey, menuId) {
    ews_model.handleEwsAction(notificationId, actionKey);
    $(menuId).hide();
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
        ews_utils._callOnCompletion(callback);
      }, 300);
    }
  }

};


/**
 * Encapsulates details of a ews "block": its unique key,
 * its translated name, and the ews items it contains.
 */
ews_utils.EwsBlock = Class.create(nautilus_utils.GenericBlock, {

  initialize : function(id, name, contentsId, ewsItems) {
    this.id = id;
    this.name = name;
    this.contentsId = contentsId;
    this.ewsItems = ewsItems;
    this.numItems = ewsItems.length;
  }

});

}
  /**
   *
   * Introduction
   * ============
   * This model contains all relevant data about the Early Warning items, including
   *   o sorted list of courses with EWS items
   *   o map of course id (long) to course name
   *   o map of course id (long) to a list of value objects, which represent the EWS items
   *   o map of EWS item id (String) to EWS item
   *   o list of actions, representing context menu items.
   *   o map of course id (long), which has EWS items, to course url
   *
   */
  if (!window.ews_model) {

  var ews_model = window.ews_model = {

    // the status of an item load
    LOAD_NOT_STARTED : 1,
    LOAD_IN_PROGRESS : 2,
    LOAD_COMPLETE    : 3,

    // the types of actions that can be requested by view items
    ACTION_NAVIGATE  : "NAVIGATE",
    ACTION_NONE      : "NONE",
    ACTION_UPDATE    : "UPDATE",

    // the delimiter we use for compound keys
    KEY_DELIMITER : "::",

    // sorted list of course ids
    sortedCourseIdsList : null,

    // course id to course name map
    courseIdToCourseNameMap : null,

    // course id to a list of EWS items
    courseIdToEwsItemListMap : null,

    // ews is to EWS item map
    ewsIdToEwsItemMap : null,

    // actions list
    actionList : null,

    // maps courses to the urls necessary to reach those courses' home page
    courseLinks: null,

    // indicates whether the initial notification load is complete
    ewsLoadStatus : this.LOAD_NOT_STARTED,

    // all registered ews containers
    ewsContainers : $H(),

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
    initEws : function(courseId) {

      // initialize our logger
      this.nautilusLog = log4javascript.getDefaultLogger();

      // if this is the first time we're getting a load request
      if (!this.ewsLoadStatus|| this.ewsLoadStatus== this.LOAD_NOT_STARTED) {

        // indicate that we're staring a load.
        this.ewsLoadStatus = this.LOAD_IN_PROGRESS;

        // call down to the server to get all EWS info for the current user; this
        // returns an aggregate data structure that contains both a list of all
        // EWS data
        NautilusViewService.getEwsViewInfo(courseId, function(viewInfo) {

          this.courseIdToCourseNameMap  = viewInfo.courseIdToCourseNameMap;
          this.courseIdToEwsItemListMap = viewInfo.courseIdToEwsDisplayMap;
          this.ewsIdToEwsItemMap         = viewInfo.ewsIdToEwsDisplayMap;
          this.sortedCourseIdsList      = viewInfo.courseIdsList;
          this.courseLinks              = viewInfo.courseLinks;
          this.actionList               = viewInfo.actionsList;

          this.ewsLoadStatus = this.LOAD_COMPLETE;

          // tell all registered notification containers that we're finished
          this.ewsContainers.values().each( function(container) {
            if (container.ewsLoaded)
            {
               // only notify if the container defined a ewsLoaded callback function
               container.ewsLoaded();
            }
          });

        }.bind(this));
      }

      return this.ewsLoadStatus ;

    },

    /**
     * Returns the status of the loading EWS items. It is not safe to interact with this model
     * until the load status is LOAD_COMPLETE.
     *
     * @return The load status
     */
    getLoadStatus : function() {
      return this.ewsLoadStatus;
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
     * Register the given EWS container. All registered containers will
     * be informed when EWS load events occur (currently, this is limited
     * to "EWS load complete" events).
     *
     * @param container The container to inform when notification loads are complete
     */
    registerEwsContainer : function(container) {
      var viewId = container.viewId;
      this.ewsContainers.set(viewId, container);
    },


    buildEwsItemKey: function(ewsItem) {
      return ewsItem.viewId + this.KEY_DELIMITER + ewsItem.ruleId;
    },


    /**
     * Returns a list of alphabetically sorted courses that has EWS which the user can access.
     *
     * @return A list of course that has EWS which the user can access.
     */
    getSortedCoursesForEWS: function() {
      return this.sortedCourseIdsList;
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
      var ewsItem = this.getEwsItem( ewsId );
      var actionInfo = this.getActionInfo( actionKey );


      if ( actionInfo.actionKind == this.ACTION_NAVIGATE )
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
            var ewsView = ews_model.ewsContainers.get(refreshedEwsItem.viewId);
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
     * @param actionKey      The key that identifies the action
     */
    getActionInfo: function( actionKey )
    {
      return this.getActions().find( function(item) { return item.actionKey == actionKey; });
    },

    /**
     * Returns a list of actions that can be used to populate the context menu.
     *
     * @return A list of action info for an EWS item.
     */
    getActions : function()
    {
      return this.actionList;
    }
  };
}

/**
 * A view that displays alerts.
 */
var AlertsView = Class.create(NautilusView, {

  initialize: function( $super, courseId, groupId, containerId, parentId, sources, eventGroups, viewOptions, 
		  				renderAllNotificationItems ) 
  {
    $super( courseId, groupId, sources, containerId, parentId, viewOptions, renderAllNotificationItems);

    // the notifications we're supposed to display in this view
    this.sources = sources;

    // defines notification types that should be grouped together in the view
    this.eventGroups = eventGroups;

  },

  buildView: function() {

    var viewDiv = Builder.node("div");


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

      // get all notifications for all events in this group, in which the current user
      // is a receiver
      var notifications = group.collect(function(groupEvent) {
        return notification_controller.getNotificationsByEvent(groupEvent);
      }).flatten();

      // if there are any notifications to display for this group
      if (notifications) {

        // sort notifications by start date, latest first
        notifications.sort(function(a, b) { return nautilus_utils.attributeComparator(a, b, "startDate"); });

        notifications = notifications.reject(function(item){
          return item.recipientType != notification_controller.RECIPIENT_SENDER;
        });

        // if all of the above notification recipients are rejected, do not display
        if (notifications.length > 0) {
          blocks.push( new nautilus_utils.NotificationBlock(event,
                                                            eventTitle,
                                                            notifications,
                                                            false,
                                                            notification_controller.RECIPIENT_RECEIVER,
                                                            true));
        }

      }

    });

    var view = this.renderNotificationView(blocks);
    viewDiv.appendChild(view);

    // add the whole thing to our parent container
    $(this.parentId).appendChild(viewDiv);

  },


  /**
   * Display an actor count after the notification title, if we're showing actors
   *
   * @param notification  The notification we're rendering
   * @param displayActors Whether this notification has associated actors
   */
  getNotificationTitleDecorator: function(notification, displayActors) {

    if ( displayActors ) {
      var count = notification.eventType == "OVERDUE" ? notification.receiverCount : notification.recipientCount;
      return Builder.node("span", "(" + count + ") ");
    }

    else {
      return null;
    }

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

/**
 * A view that displays EWS rules belonging to or monitored by the current user.
 */
var EwsView = Class.create(NautilusView, {

  initialize: function($super, courseId, groupId, containerId, parentId, viewOptions, renderAllNotificationItems )
  {
    $super( courseId, groupId, null, containerId, parentId, false, notification_controller.RECIPIENT_NONE, viewOptions, 
    		renderAllNotificationItems);
  },

  /**
   * Display the view. Also registers with the ews model.
   */
  display: function($super) {

    ews_model.registerEwsContainer(this);

    if (ews_model.getLoadStatus() == ews_model.LOAD_COMPLETE ) {
      this.ewsLoaded();
    }

  },


  /**
   * Called when the EWS model finishes loading. If the main model is finished as well,
   * builds the view. Otherwise waits for that to complete.
   */
  ewsLoaded: function() {

    // build the view only when both the notificaiton and EWS models are fully loaded
    if (notification_controller.getLoadStatus() == notification_controller.LOAD_COMPLETE && ews_model.ewsLoadStatus == ews_model.LOAD_COMPLETE) {

      // make sure we haven't already rendered this view; we could get multiple calls if a
      // view refresh is executed; we need to ignore those guys, because EWS doesn't
      // honor refreshes
      if ( ! $(this.parentId).down() ) {

        this.buildView();

        // expand all blocks that were expanded last time the user was in this view
        this.expandedBlocks.each(function(blockId) {
          this.toggleBlock(blockId, true, true);
        }.bind(this));

      }

    }

  },


  /**
   * Override the standard notification loader handler to send control to the ews loaded
   * event handler.
   */
  notificationsLoaded: function() {
    this.ewsLoaded();
  },


  buildView: function(){

    var blocks = $A();

    var sortedCourseIdsList = ews_model.getSortedCoursesForEWS();

    // create a block for each course id we got back
    if (sortedCourseIdsList && sortedCourseIdsList.length > 0) {
      sortedCourseIdsList.each(function(courseId) {

        // courseName is used as the title of the block
        var courseName = ews_model.getCourseName( courseId );

        // list of line items shown in the block
        var ewsItemsList = ews_model.getEwsItemListForCourse( courseId );

        //attach ewsView.viewId to each of the ewsItems
        if (ewsItemsList && ewsItemsList.length > 0) {
          ewsItemsList.each(function(ewsItem) {
            ewsItem.viewId = this.viewId;
          }.bind(this));

          // unique blockId
          var blockId = this.viewId + "||" + courseId + "||" + "_ews_block";

          // take blockId, courseName, ewsItemsList and use it to construct the Block and add it to the list of blocks
          blocks.push( new ews_utils.EwsBlock(blockId, courseName, this.parentId, ewsItemsList));
        }
      }.bind(this));
    }

    var view = this.renderNotificationView(blocks);

    var viewDiv = Builder.node("div");
    viewDiv.appendChild(view);

    // add the whole thing to our parent container
    $(this.parentId).appendChild(viewDiv);
  },



  /**
   * Renders the contents of a single block.
   *
   * @param notifications The notifications in the block
   * @return              A list of notifications, rendered as an html list
   */
  renderGenericBlock : function(block) {

    var list = Builder.node("ul", {id: this._getBlockListId(block.id), className : "itemGroups", style: 'display: none'});

    // convert the ews rules into a hash indexed by rule name, so we can sort
    var itemMap = $H();
    block.ewsItems.each(function(ewsItem) {itemMap.set(ewsItem.ruleTitleDisplay, ewsItem);});

    // ... and then sort them
    var ewsItems = itemMap.keys().sort().collect(function(name) { return itemMap.get(name); });

    // now render all the rules for this block
    ewsItems.each( function(ewsItem) {
      list.appendChild(this.buildLineItem(ewsItem.ruleId, ewsItem));
    }.bind(this));

    var blockListId = this._getBlockListId(block.id);

    // if this block was open last time we were in here, open it up
    if (this._isExpanded(blockListId))
    {
      this.expandedBlocks.push(block.id);
    }

    return list;

  },

  buildLineItem: function(elementId, ewsItem) {
    var itemId = this._getNotificationElementId(elementId);
      var item = Builder.node("li", {id: itemId});

      // create the menu anchor, and listen for a click
      var menu = this._createContextMenu("emenu::" + itemId);

      Event.observe(menu, "click", function(event) {
        this.displayEwsActionMenu(elementId, "emenu::" + itemId);
      }.bind(this));

      // call out to the renderer to display this notification entry
      item.appendChild(this.renderNotificationItem(ewsItem, menu));
      return item;
  },


  displayEwsActionMenu: function(ewsId, parentButtonId) {

    var actions = ews_model.getActions(ewsId);

    this.displayMenu(actions, parentButtonId, function(item) {

      var menuItem;

      // create the menu item
      menuItem = Builder.node("a", {onclick: "ews_utils.ewsActionSelected('" + ewsId + "', '" + item.actionKey + "', 'menuDiv')", href: "#" }, item.actionName);


      // ... and add it to the list
      var listElement = this.appendChild(Builder.node("li"));
      listElement.appendChild(menuItem);

    });

  },

  renderNotificationItem: function(ewsItem, menu, displayActors) {

    // the elements that go into a displayed ews item
    var elements = [ewsItem.ruleTitleDisplay, " " , menu];

    if (!this.viewOptions.hideCourses) {

      elements.push(Builder.node("span", {id: ews_model.buildEwsItemKey(ewsItem), className: "course"}, [
        "(", ewsItem.lastRefreshDate, ")"
     ]));
    }

    return(Builder.node("text", elements));
  },

  /**
   * Override the default "no notifications" message to display something about no
   * EWS rules.
   */
  renderNoNotificationsMsg: function() {

    return Builder.node
             ("p", {className: "noItems"},
                 notification_controller.getResource("nautilus.view.noEwsItems"));

  }


});

EwsView.SUPPORTED_NOTIFICATIONS = [ "EW::EW_AVAIL" ];
/**
 * A view that displays Activity Alerts.
 */
var ActivityAlertsView = Class.create(NautilusView, {

  initialize: function( $super, courseId, groupId, containerId, parentId, sources, eventGroups, viewOptions,
		                renderAllNotificationItems) 
  {
    $super(courseId, groupId, sources, containerId, parentId, viewOptions, renderAllNotificationItems );

    // the notifications we're supposed to display in this view
    this.sources = sources;

    // defines notification types that should be grouped together in the view
    this.eventGroups = eventGroups;

  },

  /**
   * Override the standard notification loader handler to send control to the
   * activity alerts loaded event handler.
   */
  notificationsLoaded: function() {
    this.activityAlertsLoaded();
  },

  /**
   * Called when the Activity Alerts model finishes loading. If the main model is finished as well,
   * builds the view. Otherwise waits for that to complete.
   */
   activityAlertsLoaded: function() {

    // build the view only when the notification model is fully loaded
    if (notification_controller.getLoadStatus() == notification_controller.LOAD_COMPLETE ) {

      // make sure we haven't already rendered this view; we could get multiple calls if a
      // view refresh is executed; we need to ignore those guys, because this doesn't
      // honor refreshes
      if ( ! $(this.parentId).down() ) {

        this.buildView();

        // expand all blocks that were expanded last time the user was in this view
        this.expandedBlocks.each( function( blockId ) {
          this.toggleBlock( blockId, true, true );
        }.bind( this ));
      }
    }
  },

  buildView: function() {

    var viewDiv = Builder.node("div");

    var blocks = $A();

    // get a list of all supported events that have associated notifications
    var events = notification_controller.getEvents(nautilus_utils.flattenEventMap(this.sources));

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

      // get all notifications for all events in this group, in which the current user
      // is a receiver
      var notifications = group.collect( function( groupEvent ) {
        return notification_controller.getNotificationsByEvent(groupEvent);
      }).flatten();

      // if there are any notifications to display for this group
      if (notifications) {

        // sort notifications by start date, latest first
        notifications.sort(function(a, b) { return nautilus_utils.attributeComparator(a, b, "startDate"); });

        // if there are notifications, create blocks for them
        if (notifications.length > 0)
        {
          blocks.push( new nautilus_utils.NotificationBlock( event,
                                                             eventTitle,
                                                             notifications,
                                                             false,
                                                             notification_controller.RECIPIENT_RECEIVER,
                                                             false ) );
        }

      }

    });

    var view = this.renderNotificationView(blocks);
    viewDiv.appendChild(view);

    // add the whole thing to our parent container
    $(this.parentId).appendChild(viewDiv);
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
