import req from '../../utils/req'

export function getNoteContent(id) {
    return req.get('/notes/content/getNoteContent/' + id);
}

export function updateNoteContent(data){
    return req.postPayload("/notes/content/update",data)
  }
 
  