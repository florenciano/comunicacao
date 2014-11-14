/**
 * A view that display notifications on what's newly available.
 */

var WhatsNewView = Class.create(NautilusView, {

  initialize: function( $super, courseId, groupId, containerId, parentId, sources, relevantActors, viewOptions,
  						renderAllNotificationItems )
  {

    // the events we're supposed to display in this view
    this.sources = sources;

    // the actor types, for certain events, that we're supposed to display notifications for
    this.relevantActors = relevantActors;

    this.availableSources = null;

    $super(courseId, groupId, sources, containerId, parentId, viewOptions, renderAllNotificationItems );

  },

  buildView: function() {

    var allSources = notification_controller.getSources();

    // if our caller only wants to see a subset of the available sources, filter out
    // the ones he doesn't care about
    if (this.sources) {
      this.availableSources = allSources.findAll(function(item) {
        return this.sources[item];
      }.bind(this));
    }

    // otherwise include all sources
    else {
      this.availableSources = allSources;
    }

    var blocks = $A();

    // loop through all sources
    this.availableSources.each( function(sourceType) {

      // get all the notifications for the current source
      var notifications =
        notification_controller.getNotificationsBySource(sourceType, this.sources[sourceType]);

      if (notifications.length > 0) {

        // sort notifications by start date (latest first) and title
        notifications.sort(function(a, b) {

          var dateCompare = nautilus_utils.attributeComparator(b, a, "startDate");

          // if the dates match, sort by title
          if (dateCompare === 0)
          {
            return nautilus_utils.attributeComparator(a, b, "title");
          }
          else
          {
            return dateCompare;
          }

        });


        // discard the notifications for recipient types we don't care about; the
        // relevant recipient type varies based on the event type
        notifications = notifications.reject(function(item) {
          var userKindOfNotificationToKeep = this.relevantActors[item.eventType];
          return userKindOfNotificationToKeep ? item.recipientType != userKindOfNotificationToKeep : null;
        }.bind(this));

        // if any of the above user kind notification recipients are rejected, do not display
        if (notifications.length > 0) {
          var sourceTitle = notification_controller.getSourceInfo(sourceType).sourceName;
          blocks.push( new nautilus_utils.NotificationBlock(sourceType, sourceTitle, notifications));
        }
      }

    }.bind(this));

    //If there are no genericBlocks, then load data to construct genericBlocks. This check is to avoid
    //unnecessary loading unread information while refreshing modules
    if(!this.genericBlocks)
    {
      NautilusViewService.getUnreadCountViewInfo( courseId, function(viewInfo) {
        this.discussionBoardUnreadInfo  = viewInfo.discussionBoardUnreadInfo;
        this.blogUnreadInfo = viewInfo.blogUnreadInfo;
        this.journalUnreadInfo = viewInfo.journalUnreadInfo;
        this.resources = viewInfo.resources;

        this.genericBlocks = this.buildUnreadInfoBlocks();

        this.genericBlocks.each(function (block) {
          blocks.push(block);
        });
        this.handleBlocks( blocks );
      }.bind(this));
    }
    else
    {
      this.genericBlocks.each(function (block) {
        blocks.push(block);
      }.bind(this));
      this.handleBlocks( blocks );
    }
  },

  handleBlocks : function( blocks )
  {
    var viewDiv = Builder.node("div", {className: "portletBlock"});


    var view = this.renderNotificationView(blocks, true);
    viewDiv.appendChild(view);

    // add the whole thing to our parent container
    $(this.parentId).appendChild(viewDiv);

    var viewId = this.viewId;

    // if the generic block actor list was expanded the last time the
    // user was in this view, re-expand it now.
    var theseBlocks = $H( this.blocks ).values();
    for( var i = 0; i < theseBlocks.length; i++ ) {

      var block = theseBlocks[ i ];
      var blockId = block.id;
      var blockElementId = this._getBlockElementId( blockId );

      // get the list for this block and check if it should be expanded
      var ulList = $( blockElementId ).getElementsBySelector( "ul" );
      ulList.each( function( ul ) {
        if ( notification_controller.isNodeExpanded( ul.id ) )
        {
          nautilus_utils.toggleBlock( viewId, blockId );
        }
      });
    }
  },

  buildUnreadInfoBlocks: function(){
    var genericBlocks = $A();
    this.buildDiscussionBoardUnreadBlock( genericBlocks );
    this.buildBlogUnreadBlocks( genericBlocks );
    return genericBlocks;
  },

  buildBlogUnreadBlocks: function( blocks )
  {
    var blogUl = $("blogUl");
    var journalUl = $("journalUl");
    if( this.blogUnreadInfo.isMyBlogsAvailable)
    {
      var myBlogsNode = this.buildBlogUnreadLi(false,true,  this.blogUnreadInfo.myBlogsUnreadCountList, this.courseId);
      blogUl.appendChild(myBlogsNode);
    }
    if( this.blogUnreadInfo.isOtherBlogsAvailable)
    {
      var otherBlogsNode = this.buildBlogUnreadLi(false,false,  this.blogUnreadInfo.otherBlogsUnreadCountList, this.courseId);
      blogUl.appendChild(otherBlogsNode);
    }
    if(this.journalUnreadInfo.isMyBlogsAvailable)
    {
      var myJournalsNode = this.buildBlogUnreadLi(true, true, this.journalUnreadInfo.myBlogsUnreadCountList, this.courseId);
      journalUl.appendChild(myJournalsNode);
    }
    if(this.journalUnreadInfo.isOtherBlogsAvailable)
    {
      var otherJournalsNode = this.buildBlogUnreadLi(true, false, this.journalUnreadInfo.otherBlogsUnreadCountList, this.courseId);
      journalUl.appendChild(otherJournalsNode);
    }

    if( this.blogUnreadInfo.isMyBlogsAvailable ||  this.blogUnreadInfo.isOtherBlogsAvailable)
    {
      blocks.push(new nautilus_utils.GenericBlock("blog", this.getResource("nautilus.blog.blogs"), "blogUl",  this.blogUnreadInfo.blogTotalUnreadCount));
    }
    if(this.journalUnreadInfo.isMyBlogsAvailable || this.journalUnreadInfo.isOtherBlogsAvailable)
    {
      blocks.push(new nautilus_utils.GenericBlock("journal", this.getResource("nautilus.blog.journals"), "journalUl", this.journalUnreadInfo.blogTotalUnreadCount));
    }
    return blocks;
  },

  buildDiscussionBoardUnreadBlock: function( blocks )
  {
    if (this.discussionBoardUnreadInfo.isDiscussionBoardAvailable)
    {
      var discussionBoardUl = $("discussionBoardUl");
      this.discussionBoardUnreadInfo.courseUnreadCountList.each(function(dbUnreadInfo){
        var unreadMessageText;
        var courseLi = null;
        var courseName = dbUnreadInfo.courseName;
        var courseDiv = null;
        var itemCountSpan = null;

        if(dbUnreadInfo.courseUnreadCount >0)
        {
          unreadMessageText =this.getUnreadText(dbUnreadInfo.courseUnreadCount);
          itemCountSpan = Builder.node("span",{ className: 'newItemCount'},
                                           [Builder.node("a", {target:'_top', href: dbUnreadInfo.courseUrl},
                                                         '('+dbUnreadInfo.courseUnreadCount+' '+unreadMessageText+')')]);
          if(dbUnreadInfo.totalUnreadCount > dbUnreadInfo.courseUnreadCount )
          {
            courseLi = Builder.node("li", {title: courseName, id:'discussionBoard'+courseName+'Li'},
                                    [this.getUnreadDbToggleNode(courseName),
                                     courseName]);

            courseDiv = this.generateCourseDivWithGroupUnreadDb(dbUnreadInfo);
            courseLi.appendChild( itemCountSpan );
            courseLi.appendChild(courseDiv);

          }
          else
          {
            courseLi = Builder.node("li", {className: 'childless', id: 'discussionBoard'+courseName+'Li'},courseName);
            courseLi.appendChild( itemCountSpan );
          }
        }
        // no unread threads in course discussionBoard but there are in group discussionBoard
        else
        {
          courseLi = Builder.node("li", {title: courseName, id:'discussionBoard'+courseName+'Li'},
                                  [this.getUnreadDbToggleNode(courseName),
                                   courseName]);
          courseDiv =  this.generateCourseDivWithGroupUnreadDb(dbUnreadInfo);
          courseLi.appendChild(courseDiv);
        }
        discussionBoardUl.appendChild( courseLi );
      }.bind(this));
      blocks.push(new nautilus_utils.GenericBlock("discussionBoard", this.getResource("conference.discussion.board"), "discussionBoardUl", this.discussionBoardUnreadInfo.discussionBoardTotalUnreadCount ));
    }
  },

  getUnreadDbToggleNode: function( courseName )
  {
    return Builder.node("a",{href: '#', onclick: "nautilus_utils.toggleGenericBlockActors('discussionBoard', '"+courseName+"')"},
                        [Builder.node("img", {alt:this.getResource("blog.expand"),id: 'discussionBoard'+courseName+'Img', src:'/images/ci/icons/plus.gif' })]);
  },

  getUnreadBlogToggleNode: function( blogStr, isJournal )
  {
    var blockId = isJournal? 'journal': 'blog';
    return Builder.node("a",{href: '#', onclick: "nautilus_utils.toggleGenericBlockActors('"+blockId+"', '"+blogStr.replace(/'/g, '\\\'')+"')"},
                        [Builder.node("img", {alt:this.getResource("blog.expand"),id: blockId+blogStr+'Img', src:'/images/ci/icons/plus.gif' })]);
  },

  getUnreadText: function( unreadCount )
  {
    if( unreadCount > 1 )
    {
      return this.getResource("whatsnew.unreadmessages");
    }
    else
    {
      return this.getResource("whatsnew.unreadmessage");
    }
  },

  getUnreadPostText: function( unreadCount )
  {
    if( unreadCount > 1 )
    {
      return this.getResource("whatsnew.unreadposts");
    }
    else
    {
      return this.getResource("whatsnew.unreadpost");
    }
  },

  generateCourseDivWithGroupUnreadDb: function( dbUnreadInfo )
  {
    var courseName = dbUnreadInfo.courseName;
    var courseDiv = Builder.node("div",{style: 'display: none;', id:'discussionBoard'+courseName+'Div'});
    var courseUl = Builder.node("ul", {id: 'discussionBoard'+courseName+'Ul', className: 'memberList', style: 'display: block;'});

    var groupUnreadCountList = dbUnreadInfo.groupUnreadCountList;
    groupUnreadCountList.each(function(groupUnreadInfo){
      var groupUnreadText =this.getUnreadText(groupUnreadInfo.groupUnreadCount);
      var groupLi = Builder.node("li",{id:'discussionBoard'+courseName+groupUnreadInfo.groupName+'Li'},
                                 [groupUnreadInfo.groupName,
                                  Builder.node("span", {className: 'newItemCount'},
                                               Builder.node("a",{target: '_top', href:groupUnreadInfo.groupUrl}, '('+groupUnreadInfo.groupUnreadCount+' '+groupUnreadText+')'))]);
      courseUl.appendChild(groupLi);
    }.bind(this));
    courseDiv.appendChild(courseUl);
    return courseDiv;
  },

  generateUnreadBlogsDiv: function( blogStr, isJournal, blogUnreadCountList, courseId )
  {
    var blockId = isJournal? 'journal': 'blog';
    var blogDiv = Builder.node("div",{style: 'display: none;', id: blockId + blogStr + 'Div'});
    var blogUl = Builder.node("ul", {id: blockId + blogStr + 'Ul', className: 'memberList', style: 'display: block;'});
    blogUnreadCountList.each( function( blogUnreadCount ){
      var mainNode;
      var unreadPostText = this.getUnreadPostText( blogUnreadCount.unreadCounts );
      var unreadCountStr = "("+blogUnreadCount.unreadCounts +" "+ unreadPostText + ")";
      var li = Builder.node("li",{id:blockId + blogStr+ blogUnreadCount.blogName +'Li'});
      var div = Builder.node("div",{className:"newItemCount"},
                             [Builder.node("a",{target: '_top', href: blogUnreadCount.blogUrl}, blogUnreadCount.blogName)]);
      if( courseId != null )
      {
        if( blogUnreadCount.unreadCounts > 0 )
        {
          div.appendChild(document.createTextNode(unreadCountStr));
        }
      }
      else
      {
        div.appendChild(Builder.node("a", {target: '_top', href: blogUnreadCount.courseUrl},
                                     "("+blogUnreadCount.courseName+")"));
        if( blogUnreadCount.unreadCounts > 0 )
        {
          div.appendChild(document.createTextNode(unreadCountStr));
        }
      }
      mainNode = li.appendChild( div );
      if(blogUnreadCount.newCommentsAvailable )
      {
        mainNode.appendChild(Builder.node("span", {className: 'newItems'},
                                          [Builder.node("img",{src:'/images/ci/ng/blog_comment_new_li.gif', alt: this.getResource("collab.legend.new_comments"),
                                            title: this.getResource("collab.legend.new_comments")})]));
      }
      blogUl.appendChild( mainNode );
    }.bind(this));

    blogDiv.appendChild( blogUl );
    return blogDiv;
  },


  buildBlogUnreadLi: function( isJournal, isMine, blogsUnreadCountList, courseId )
  {
    var blogStr;
    var blockId;
    if ( !isJournal )
    {
      blockId = 'blog';
      if( isMine )
      {
        blogStr = this.getResource("nautilus.blog.my.blogs");
      }
      else
      {
        blogStr = this.getResource("nautilus.blog.other.blogs");
      }
    }
    else
    {
      blockId = 'journal';
      if( isMine )
      {
        blogStr = this.getResource("nautilus.blog.my.journals");
      }
      else
      {
        blogStr = this.getResource("nautilus.blog.other.journals");
      }
    }
    var blogLi = Builder.node("li",{title: blogStr, id:blockId+blogStr+'Li'},
                              [this.getUnreadBlogToggleNode(blogStr, isJournal),
                               blogStr,
                               this.generateUnreadBlogsDiv(blogStr, isJournal, blogsUnreadCountList, courseId )]);
    return blogLi;
  },

  /**
   * Get the translated resource.
   *
   * @param key Resource key
   * @return    Translated resource
   */
  getResource : function( key )
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
    return result;
  },

  /**
   * Called when all notifications have been removed from the model underlying this view.
   * We override the base class's version of this method so that we can save the contents
   * of the generic blocks from the indiscriminate view destruction that will soon follow.
   *
   * Our generic blocks are built statically, so we can't rebuild if the view is
   * refreshed -- thus the need to preserve them.
   */
  notificationsUnloaded: function($super) {

    // first save the contents of the generic blocks (which are pre-built
    // on the page) from the destruction that is sure to follow; this so
    // that it can be reconstituted later
    if (this.genericBlocks) {

      this.genericBlocks.each ( function(block) {
        $(block.contentsId).hide();
        $(this.parentId).appendChild($(block.contentsId));
      }.bind(this));

    }

    $super();

  },

  /**
   * Add a "submitted" decorator if this is an attemp item
   *
   * @param notification  The notification we're rendering
   * @param displayActors Whether this notification has associated actors
   */
  getNotificationTitleDecorator: function(notification, displayActors) {

     if ( notification.eventType == "AS_GA_ATTEMPT" || notification.eventType == "AS_GA_LATE_ATTEMPT" ) {
       return notification_controller.getResource("nautilus.view.submitted");
     }

  },


  getAvailableSources: function() {
    return this.availableSources;
  }

});
