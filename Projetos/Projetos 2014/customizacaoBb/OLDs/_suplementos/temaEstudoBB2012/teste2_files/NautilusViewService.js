
// Provide a default path to dwr.engine
if (dwr == null) var dwr = {};
if (dwr.engine == null) dwr.engine = {};
if (DWREngine == null) var DWREngine = dwr.engine;

if (NautilusViewService == null) var NautilusViewService = {};
NautilusViewService._path = '/webapps/portal/dwr_open';
NautilusViewService.removeRecipient = function(p0, callback) {
  dwr.engine._execute(NautilusViewService._path, 'NautilusViewService', 'removeRecipient', p0, callback);
}
NautilusViewService.removeNotificationsFromUser = function(p0, callback) {
  dwr.engine._execute(NautilusViewService._path, 'NautilusViewService', 'removeNotificationsFromUser', p0, callback);
}
NautilusViewService.getNotificationActors = function(p0, p1, callback) {
  dwr.engine._execute(NautilusViewService._path, 'NautilusViewService', 'getNotificationActors', p0, p1, callback);
}
NautilusViewService.getUnreadCountViewInfo = function(p0, callback) {
  dwr.engine._execute(NautilusViewService._path, 'NautilusViewService', 'getUnreadCountViewInfo', p0, callback);
}
NautilusViewService.getEwsViewInfo = function(p0, callback) {
  dwr.engine._execute(NautilusViewService._path, 'NautilusViewService', 'getEwsViewInfo', p0, callback);
}
NautilusViewService.getViewInfo = function(p0, p1, p2, p3, p4, callback) {
  dwr.engine._execute(NautilusViewService._path, 'NautilusViewService', 'getViewInfo', p0, p1, p2, p3, p4, false, callback);
}
NautilusViewService.handleUpdateGeneralAction = function(p0, p1, p2, p3, p4, callback) {
  dwr.engine._execute(NautilusViewService._path, 'NautilusViewService', 'handleUpdateGeneralAction', p0, p1, p2, p3, p4, callback);
}
NautilusViewService.getViewInfoWithLimit = function(p0, p1, p2, p3, p4, callback) {
  dwr.engine._execute(NautilusViewService._path, 'NautilusViewService', 'getViewInfoWithLimit', p0, p1, p2, p3, p4, false, callback);
}
NautilusViewService.mockableHandleNotificationAction = function(p0, p1, p2, p3, callback) {
  dwr.engine._execute(NautilusViewService._path, 'NautilusViewService', 'mockableHandleNotificationAction', p0, p1, p2, p3, callback);
}
NautilusViewService.handleExpansion = function(p0, p1, p2, callback) {
  dwr.engine._execute(NautilusViewService._path, 'NautilusViewService', 'handleExpansion', p0, p1, p2, false, callback);
}
NautilusViewService.handleUpdateNotificationAction = function(p0, p1, p2, p3, callback) {
  dwr.engine._execute(NautilusViewService._path, 'NautilusViewService', 'handleUpdateNotificationAction', p0, p1, p2, p3, callback);
}
NautilusViewService.handleGeneralAction = function(p0, p1, p2, p3, callback) {
  dwr.engine._execute(NautilusViewService._path, 'NautilusViewService', 'handleGeneralAction', p0, p1, p2, p3, callback);
}
NautilusViewService.refreshNotifications = function(callback) {
  dwr.engine._execute(NautilusViewService._path, 'NautilusViewService', 'refreshNotifications', callback);
}
NautilusViewService.handleNotificationAction = function(p0, p1, p2, p3, callback) {
  dwr.engine._execute(NautilusViewService._path, 'NautilusViewService', 'handleNotificationAction', p0, p1, p2, p3, callback);
}
NautilusViewService.handleActorAction = function(p0, p1, p2, callback) {
  dwr.engine._execute(NautilusViewService._path, 'NautilusViewService', 'handleActorAction', p0, p1, p2, callback);
}
NautilusViewService.mockableGetViewInfo = function(p0, p1, p2, p3, p4, p6, callback) {
  dwr.engine._execute(NautilusViewService._path, 'NautilusViewService', 'mockableGetViewInfo', p0, p1, p2, p3, p4, false, p6, callback);
}
NautilusViewService.handleNotificationEventAction = function(p0, p1, p2, p3, callback) {
  dwr.engine._execute(NautilusViewService._path, 'NautilusViewService', 'handleNotificationEventAction', p0, p1, p2, p3, callback);
}
