/**
 * A view that displays a list of past-due tems
 */
var WhatsPastDueView = Class.create(NautilusView, {

  initialize: function( $super, courseId, groupId, containerId, parentId, sources, viewOptions,
		  				renderAllNotificationItems )
  {
    $super(courseId, groupId, sources, containerId, parentId, viewOptions, renderAllNotificationItems);

    // the events we're supposed to display in this view
    this.sources = sources;

  },

  buildView: function(){

    var viewDiv = Builder.node("div");

    // crunch the event map down into a list of fully-qualified event names
    var events = nautilus_utils.flattenEventMap(this.sources);

    // get all overdue notifications
    var notifications = notification_controller.getNotificationsByEvent(events);

    if (notifications)
    {
      notifications = notifications.reject(function(item)  {
        return item.recipientType != notification_controller.RECIPIENT_RECEIVER;
      });
    }

    var eventTitle = notification_controller.getResource("nautilus.view.allItems");

    var view =
      this.renderNotificationView
        ([new nautilus_utils.NotificationBlock(this.viewId + "_pastdue_block",
                                               eventTitle,
                                               notifications,
                                               true,
                                               false,
                                               false,
                                               notification_controller.getResource("nautilus.view.todo.noNotificationsPastDue"))]);

    viewDiv.appendChild(view);

    // add the whole thing to our parent container
    $(this.parentId).appendChild(viewDiv);

  },

  /**
   * Augment base notification renderer to add "due" label.
   *
   * @param notification
   * @param menu
   * @param showActors
   */
  renderNotificationItem: function(notification, menu, showActors) {

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
   * This augments the standard course info with a past due date.
   *
   * @param notification The notification in questions
   */
  renderNotificationItemCourse: function (notification) {

    // show the course name, and link to that course
    return Builder.node("div", {className: "course"},
             [ Builder.node("a", {target: "_top", href: notification_controller.getCourseLink(notification.courseId) },
                          notification.courseName),
               this.renderDueDate(notification) ]);

  },


  /**
   * Build and return an element containing this notification's dude date.
   *
   * @param notification  The notification
   */
  renderDueDate: function(notification) {

    var dueDate = formatDate(notification.dueDate, notification_controller.getResource("LOCALE_SETTINGS.internal_date_format") );
    return Builder.node("span", {className: "due flag"}, notification_controller.getResource("nautilus.view.todo.due") + " " + dueDate);

  }



});
