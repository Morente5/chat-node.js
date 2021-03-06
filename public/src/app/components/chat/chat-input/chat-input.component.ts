import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';

import { ChannelsService } from './../../../services/channels.service';
import { ChatVideoComponent } from './../chat-video/chat-video.component';

import { Channel } from './../../../model/channel';
import { Message } from './../../../model/message';

@Component({
  selector: 'chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.css']
})
export class ChatInputComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef;
  selectedChannel: Channel;
  messageText: string;
  typeInterval = 0;
  videoActive: boolean = false;
  constructor(
    private channelsService: ChannelsService
  ) {
    this.channelsService.subjectSelectedChannel.subscribe(channel => {
      this.selectedChannel = channel;
      if (this.typeInterval) {
        window.clearTimeout(this.typeInterval);
        this.typeInterval = 0;
        this.channelsService.stopTyping();
      }
    });

    this.channelsService.subjectVideo.subscribe(value => {
      this.videoActive = value;
    });

  }

  ngOnInit() {

  }

  sendMsg() {
    if (this.messageText) {
      const tempMessage = this.messageText.trim();
      if (tempMessage) {
        this.channelsService.sendMsg(tempMessage);
      }
      this.messageText = '';
    }

  }

  uploadFile(event) {
    this.channelsService.sendFile(event.target.files[0]);

  }


  typing(event: KeyboardEvent) {
    // console.log(event.key);
    if (!this.typeInterval && event.key !== 'Enter' && event.key !== 'Backspace') {
      this.channelsService.typing();
    } else {
      window.clearTimeout(this.typeInterval);
      this.typeInterval = 0;
    }
    if (event.key !== 'Enter' && event.key !== 'Backspace') {
      this.typeInterval = window.setTimeout(() => {
        this.channelsService.stopTyping();
        this.typeInterval = 0;
      }, 6000);
    } else {
      this.channelsService.stopTyping();
    }
  }

  startVideo() {
    this.channelsService.subjectVideo.next(true);
  }

  stopVideo() {
    this.channelsService.subjectVideo.next(false);
  }


}
