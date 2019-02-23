import { Component, OnInit , Input} from '@angular/core';
import { Post }from '../../posts/post.model';
import { PostsService }from '../../posts/posts.service';

@Component({
	selector: 'app-post-list',
	templateUrl: './post-list.component.html',
	styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
	
	// define property in class (old way)
	// postsService: PostsService;
	
	@Input() posts: Post[] = [
	// {title: "First post",content: "this is the content of the First post"},
	// {title: "Second post",content: "this is the content of the Second post"},
	// {title: "Third post",content: "this is the content of the Third post"}
	]
	
	// shortcut way to define property in class is add public keyword in constructor's parameter
	constructor(public postsService: PostsService) { 

	}

	ngOnInit() {
	}

}
