import req from '../../utils/req'

export function tree(param) {
  return req.get('/notes/menu/tree',param);
}
export function createNotesMenu(data){
  return req.postPayload("/notes/menu/create",data)
}
export function updateNotesMenu(data){
  return req.postPayload("/notes/menu/update",data)
}

export function deleteNotesMenu(param) {
  return req.get('/notes/menu/delete',param);
}