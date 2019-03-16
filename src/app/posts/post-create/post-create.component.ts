import { Component, OnInit, EventEmitter, Output} from '@angular/core';
import { NgForm, FormControl, Validators ,FormGroup} from '@angular/forms';
import { PostsService } from '../../posts/posts.service';
import { Post } from '../post.model';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { mimeType } from './post-mime-type.validators';

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
	imagePreview: string;
	isLoading = false;
	form : FormGroup;

	// injecting the PostsService
	constructor(public postsService: PostsService , public route: ActivatedRoute ) {}

	
	ngOnInit() {
		this.form = new FormGroup({
			title: new FormControl(null, {validators: [Validators.required,Validators.minLength(3)]}),
			content: new FormControl(null, {validators: [Validators.required]}),
			image: new FormControl(null, {validators: [Validators.required], asyncValidators: [mimeType]})
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
			this.postsService.addPost(
				this.form.value.title,
				this.form.value.content,
				this.form.value.image
			);
			this.form.reset();
		}else{
			this.postsService.updatePost(this.postId , this.form.value.title, this.form.value.content);
			this.form.reset();

		}
		
	}

	onImagePicked(event: Event){
		const file = (event.target as HTMLInputElement).files[0];
		this.form.patchValue({image:file})
		this.form.get('image').updateValueAndValidity();

		// converting image to dataUrl. data url adalah url yang dapat digunakan oleh normal image tag (html). add properti imagePreview: string;
		const reader = new FileReader();

		// now we can use that reader and define an onload event
		reader.onload = () => {
			this.imagePreview = <string>reader.result;
		};

		// it wont do anything unless we do something
		reader.readAsDataURL(file);
	}
}
