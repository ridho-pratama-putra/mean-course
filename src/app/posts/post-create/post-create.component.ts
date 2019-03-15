import { Component, OnInit, EventEmitter, Output} from '@angular/core';
import { NgForm, FormControl, Validators ,FormGroup} from '@angular/forms';
import { PostsService } from '../../posts/posts.service';
import { Post } from '../post.model';
import { ActivatedRoute, ParamMap } from '@angular/router';

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
	form : FormGroup;

	// injecting the PostsService
	constructor(public postsService: PostsService , public route: ActivatedRoute ) {}

	
	ngOnInit() {
		this.form = new FormGroup({
			title: new FormControl(null, {validators: [Validators.required,Validators.minLength(3)]}),
			content: new FormControl(null, {validators: [Validators.required]})
		})
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
					this.form.setValue({title:this.post.title,content: this.post.content})
				});
			}else{
				this.mode = 'create';
			}
		})
	}

	// sebelumnya adalah on add, diganti ke onsave karena biar bisa handle update juga, nggk hanya create
	// onAddPost( form: NgForm ){
	onSavePost(){
		if (this.form.invalid) {
			return;
		}
		this.isLoading = true;
		if(this.mode == 'create'){
			this.isLoading = false;
			this.postsService.addPost(this.form.value.enteredTitle,this.form.value.enteredContent);
		}else{
			this.postsService.updatePost(this.postId , this.form.value.enteredTitle, this.form.value.enteredContent)
		}
		this.form.reset();		
	}
}
