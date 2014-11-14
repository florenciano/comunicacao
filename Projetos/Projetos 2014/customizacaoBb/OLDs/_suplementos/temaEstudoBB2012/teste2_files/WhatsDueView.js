/**
 * A view that displays a list of due/overdue items
 */
var WhatsDueView = Class.create(NautilusView, {

  // represents all the buckets into which due notifications can be organized
  TODAY    : 1,
  TOMORROW : 2,
  WEEK     : 3,
  FUTURE   : 4,

  initialize: function( $super, courseId, groupId, containerId, parentId, sources, viewOptions, 
		  				renderAllNotificationItems )
  {
    $super(courseId, groupId, sources, containerId, parentId, viewOptions, renderAllNotificationItems);

    // the events we're supposed to display in this view
    this.sources = sources;

  },


  buildView: function(date){

    var parent = $(this.parentId);

    // erase any existing views
    if (parent.down())
    {
      parent.removeChild(parent.down());
    }

    // figure out the dates for each of the buckets
    var dateParcel = this.getDateParcel(date ? date : new Date());

    // flatten the sources map into a list of qualified event keys
    var events = nautilus_utils.flattenEventMap(this.sources);

    // now grab all of the notifications for those events
    var notifications = notification_controller.getNotificationsByEvent(events);

    var notificationsByDate = $H();

    // classify all events by their due date
    notifications.each( function(item) {
      if ( item.dueDate) {
        notification_controller._smartPush(notificationsByDate, notification_controller.normalizeDate(item.dueDate).getTime(), item);
      }
    });

    // drop all due notifications into their appropriate buckets
    var categories = this.categorizeNotifications(notificationsByDate, dateParcel);

    // create blocks for all the buckets
    var blocks = [this.TODAY, this.TOMORROW, this.WEEK, this.FUTURE].collect(function (period) {

      return new nautilus_utils.NotificationBlock(this.viewId + "_" + period,
                                                  this.getBlockName(period, date ? true: false, dateParcel),
                                                  categories[period],
                                                  true,
                                                  false,
                                                  false,
                                                  this.getNoNotificationsMsg(period));

    }.bind(this));

    var viewDiv = Builder.node("div");

    var view = this.renderNotificationView(blocks);
    viewDiv.appendChild(view);

    // add the whole thing to our parent container
    $(this.parentId).appendChild(viewDiv);

    // the "today" bucket should be open by default
    this.toggleBlock(this.viewId + "_" + this.TODAY, true);

  },

  /**
   * Return the block title for the given period bucket.
   *
   * @param period        The date bucket block title
   * @param dateSelected  If the user chose a specific date
   * @param dateParcel    Contains the specific dates that correspond to each bucket (relative to
   *                      a user-selected date
   * @return              The block name
   */
  getBlockName: function (period, dateSelected, dateParcel) {

    switch (period) {

      case this.TODAY:

        if (dateSelected) {
          return calendar.DatePicker.datePickers[0].dispDate(dateParcel[this.TODAY], "month_date_year");
        }
        else {
          return notification_controller.getResource("nautilus.view.todo.today");
        }
        break;

      case this.TOMORROW:

        if (dateSelected) {
          return calendar.DatePicker.datePickers[0].dispDate(dateParcel[this.TOMORROW], "month_date_year");
        }
        else
        {
          return notification_controller.getResource("nautilus.view.todo.tomorrow");
        }
        break;

      case this.WEEK:

        if (dateSelected) {
          var label = notification_controller.getResource("nautilus.view.todo.selectedWeek");
          var weekStart = calendar.DatePicker.datePickers[0].dispDate(dateParcel[this.WEEK][0], "month_date_year");
          var weekEnd = calendar.DatePicker.datePickers[0].dispDate(dateParcel[this.WEEK][1], "month_date_year");
          return label + " " + weekStart + " - " + weekEnd;
        }
        else
        {
          return notification_controller.getResource("nautilus.view.todo.week");
        }
        break;

      case this.FUTURE:
        return notification_controller.getResource("nautilus.view.todo.future");

    }
  },

  /**
   * Return the message to display if no notifications are available for the given period.
   *
   * @param period The date bucket period
   * @return       The no notifications msg
   */
  getNoNotificationsMsg: function(period) {

    switch (period) {

      case this.TODAY:
        return notification_controller.getResource("nautilus.view.todo.noNotificationsToday");

      case this.TOMORROW:
        return notification_controller.getResource("nautilus.view.todo.noNotificationsTomorrow");

      case this.WEEK:
        return notification_controller.getResource("nautilus.view.todo.noNotificationsThisWeek");

      case this.FUTURE:
        return notification_controller.getResource("nautilus.view.todo.noNotificationsFuture");

    }

  },

  /**
   * Augment base notification renderer to add "due" label.
   *
   * @param notification
   * @param menu
   * @param showActors
   */
  renderNotificationItem: function (notification, menu, showActors) {

    // render the base element
    var item = NautilusView.prototype.renderNotificationItem.apply(this, [notification, menu, showActors]);

    // if we're not displaying a course line, then show the due date right after the notification
    if (this.viewOptions.hideCourses) {
      item.appendChild(this.renderDueDate(notification));
    }

    return item;

  },


  /**
   * Render the notification item course line, which appears under the notification item.
   * This augments the standard course info with a due date.
   *
   * @param notification The notification in questions
   */
  renderNotificationItemCourse: function (notification) {

    // show the course name, and link to that course
    return Builder.node("div", {className: "course"},
           [ Builder.node("a", {target: "_top", href: notification_controller.getCourseLink(notification.courseId) },
                          notification.courseName),
             this.renderDueDate(notification)] );

  },


  /**
   * Build and return an element containing this notification's due date.
   *
   * @param notification  The notification
   */
  renderDueDate: function(notification) {
    var dueDate = formatDate(notification.dueDate, notification_controller.getResource("LOCALE_SETTINGS.internal_date_format") );
    return Builder.node("span", {className: "due"}, " - " + notification_controller.getResource("nautilus.view.todo.due") + " " + dueDate);

  },


  getDateParcel: function (referenceDay) {

    // calculate all the days in the due view parcel
    var normalizedDay = notification_controller.normalizeDate(referenceDay);
    var dayOfWeek     = normalizedDay.getDay();
    var nextDay       = this.addDays(normalizedDay, 1);
    var weekStart     = this.addDays(normalizedDay, -dayOfWeek);
    var weekEnd       = this.addDays(normalizedDay, (6 - dayOfWeek) );
    var future        = this.addDays(weekEnd, 1);

    var dateParcel = {};

    dateParcel[this.TODAY]    = normalizedDay;
    dateParcel[this.TOMORROW] = nextDay;
    dateParcel[this.WEEK]     = [weekStart, weekEnd];
    dateParcel[this.FUTURE]   = future;

    return dateParcel;

  },

  /**
   * Categorize all available due notifications into the various temporal buckets
   * we support.
   *
   * @param notificationsByDate The notifications to display, organized by date
   * @param dateParcel          The buckets into which they should be organized
   */
  categorizeNotifications: function(notificationsByDate, dateParcel) {

    var today      = dateParcel[this.TODAY].getTime();
    var nextDay    = dateParcel[this.TOMORROW].getTime();
    var weekStart  = dateParcel[this.WEEK][0].getTime();
    var weekEnd    = dateParcel[this.WEEK][1].getTime();

    var dates = {};


    [this.TODAY, this.TOMORROW, this.WEEK, this.FUTURE].each(function(period) { dates[period] = []; });

    // look through all due notifications, arranging them into their appropriate buckets
    notificationsByDate.keys().each(function (currentDayStr) {

      // get all the notifications in the current day
      var notifications = notificationsByDate.get(currentDayStr);

      // screen out the notification in which the current user is the sender
      notifications = notifications.reject(function(item) {
        return item.recipientType != notification_controller.RECIPIENT_RECEIVER;
      });

      var currentDay = parseInt(currentDayStr, 10);

      // figure out which bucket these notifications go in
      if (currentDay == today)
      {
        this.pushNotifications(dates[this.TODAY], notifications);
      }
      else if (currentDay == nextDay)
      {
        this.pushNotifications(dates[this.TOMORROW], notifications);
      }
      else if (currentDay > weekEnd)
      {
        this.pushNotifications(dates[this.FUTURE], notifications);
      }

      if (currentDay >= weekStart && currentDay <= weekEnd)
      {
        this.pushNotifications(dates[this.WEEK], notifications);
      }

    }.bind(this));

    return dates;

  },


  pushNotifications: function(bucket, notifications) {
    notifications.each(function (n) {
      bucket.push(n);
    });
  },

  addDays: function(date, delta) {
    return new Date(date.getTime() + (delta * 86400000 ));
  }

});
