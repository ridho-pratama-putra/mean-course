import { Component, OnInit, EventEmitter, Output} from '@angular/core';
import { NgForm, FormControl, Validators } from '@angular/forms';
import { PostsService } from '../../posts/posts.service';
import { Post } from '../post.model';
import { ActivatedRoute, ParamMap } from '@angular/router';
import {Location} from '@angular/common';

@Component({
	selector: 'app-post-create',
	templateUrl: './post-create.component.html',
	styleUrls: ['./post-create.component.css']
})

export class PostCreateComponent implements OnInit {

	// enteredTitle = ''
	// enteredContent = ''
	newPost = 'No enteredContent';
	private mode = 'create';
	private postId = null;
	private post: Post;
	isLoading = false;

	// injecting the PostsService
	constructor(public postsService: PostsService , public route: ActivatedRoute , private location: Location) {}

	
	ngOnInit() {
		this.route.paramMap.subscribe((paramMap: ParamMap) => {
			if(paramMap.has('postId')){
				this.mode = 'edit';
				this.postId = paramMap.get('postId');
				this.isLoading = true;
				this.postsService.getPost(this.postId).subscribe(postData => {
					this.isLoading = false;
					this.post = {
						id: postData._id,
						title: postData.title,
						content: postData.content
					};  
				});
			}else{
				this.mode = 'create';
			}
		})
	}

	// sebelumnya adalah on add, diganti ke onsave karena biar bisa handle update juga, nggk hanya create
	// onAddPost( form: NgForm ){
	onSavePost( form: NgForm ){
		if (form.invalid) {
			return;
		}
		this.isLoading = true;
		if(this.mode == 'create'){
			this.isLoading = false;
			this.postsService.addPost(form.value.enteredTitle,form.value.enteredContent);
		}else{
			this.postsService.updatePost(this.postId , form.value.enteredTitle, form.value.enteredContent)
		}
		form.resetForm();		
	}
}
