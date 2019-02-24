import { Component, OnInit, EventEmitter, Output} from '@angular/core';
import { NgForm, FormControl, Validators } from '@angular/forms';
import { PostsService } from '../../posts/posts.service';
import { Post } from '../post.model';

@Component({
	selector: 'app-post-create',
	templateUrl: './post-create.component.html',
	styleUrls: ['./post-create.component.css']
})

export class PostCreateComponent implements OnInit {

	enteredTitle = '';
	enteredContent = '';
	newPost = 'No content';

	// injecting the PostsService
	constructor(public postsService: PostsService ) {}

	// ng on init dibiarkan kosong karena butuh yang hanya akan dieksekusi saat create post baru, bukan setiap create component
	ngOnInit() {
	}

	onAddPost( form: NgForm ){
		if (form.invalid) {
			return;
		}
		this.postsService.addPost(form.value.enteredTitle,form.value.enteredContent);
		form.resetForm();
	}
}
