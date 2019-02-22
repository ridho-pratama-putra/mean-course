import { Component, OnInit , Input} from '@angular/core';
import { Post }from '../../posts/post.model'

@Component({
	selector: 'app-post-list',
	templateUrl: './post-list.component.html',
	styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
	@Input() posts: Post[] = [
	// {title: "First post",content: "this is the content of the First post"},
	// {title: "Second post",content: "this is the content of the Second post"},
	// {title: "Third post",content: "this is the content of the Third post"}
	]
	constructor() { }

	ngOnInit() {
	}

}
