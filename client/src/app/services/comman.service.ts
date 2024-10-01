import { EventEmitter, Injectable } from '@angular/core';
// import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommanService {
 // Modal data event emitter.
 modal = new EventEmitter<any>(false);
 friendsModal = new EventEmitter<any>(false);
 profileImageModal = new EventEmitter<any>(false);
 eploreReelModal = new EventEmitter<any>(false);
 postModalData = new EventEmitter<any>(false);
 followersData = new EventEmitter<any>();

 // Modal object.
//  friendsData: BehaviorSubject<any> = new BehaviorSubject<any>([]);

  constructor() { }

  /** show modal. */
  modalOpen(modalData?: boolean){
    this.modal.emit(modalData);
  }

  /** show modal. */
  friendsOpen(modalData?: boolean){
    this.friendsModal.emit(modalData);    
  }

  /** show modal. */
  postModal(modalData?: boolean){
    this.postModalData.emit(modalData);
  }

  /** show modal. */
  profileImageUploadModalOpen(modalData?: boolean){
    this.profileImageModal.emit(modalData);
  }

  /** show modal. */
  exploreModalOpen(modalData?: boolean){
    this.eploreReelModal.emit(modalData);    
  }

  // set to followers data
  setFollowersData(friendsData?:any){
    this.followersData.emit(friendsData);
  }
}
