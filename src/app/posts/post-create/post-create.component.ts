import { Component, OnInit, EventEmitter, Output} from '@angular/core';
import { Post } from '../../posts/post.model';
import { NgForm, FormControl, Validators } from '@angular/forms';

@Component({
	selector: 'app-post-create',
	templateUrl: './post-create.component.html',
	styleUrls: ['./post-create.component.css']
})

export class PostCreateComponent implements OnInit {

	enteredTitle = '';
	enteredContent = '';
	newPost = 'No content';
	@Output() postCreated = new EventEmitter<Post>();
	constructor() { }

	ngOnInit() {
	}

	onAddPost( form: NgForm ){
		if (form.invalid) {
			return;
		}
		const post: Post = {
			title : form.value.enteredTitle,
			content : form.value.enteredContent
		};
		this.postCreated.emit(post);
	}
}
