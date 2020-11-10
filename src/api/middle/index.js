import req from '../../utils/req'

export function getNoteContentMenuId(menuId) {
    return req.get('/notes/content/getNoteContentMenuId/' + menuId);
}
export function createNoteContent(data){
   return req.postPayload("/notes/content/create",data)
}

export function deleteNoteContent(param) {
    return req.get('/notes/content/delete' , param);
}
