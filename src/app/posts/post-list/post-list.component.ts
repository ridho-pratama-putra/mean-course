import { Component, OnInit , Input, OnDestroy} from '@angular/core';
import { Post }from '../../posts/post.model';
import { PostsService } from '../../posts/posts.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-post-list',
	templateUrl: './post-list.component.html',
	styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy{
	
	// define property in class (old way)
	// postsService: PostsService;
	
	posts: Post[] = []
	private postsSubscription: Subscription;
	isLoading = false;
	
	// shortcut way to define property in class is add public keyword in constructor's parameter
	constructor(public postsService: PostsService) { 

	}

	/*will be executed when angular create component*/
	ngOnInit() {
		this.postsService.getPosts(); // just trigger http request
		this.isLoading = true;
		this.postsSubscription = this.postsService.getPostUpdateListener()
			.subscribe((posts: Post[]) => {
				this.isLoading = false;
				this.posts = posts;
			})
	}

	ngOnDestroy(){
		this.postsSubscription.unsubscribe();
	}

	onDeletePost(postId: string){
		this.postsService.deletePost(postId)
	}
}
