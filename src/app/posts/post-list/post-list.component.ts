import { Component, OnInit , Input, OnDestroy} from '@angular/core';
import { Post }from '../../posts/post.model';
import { PostsService } from '../../posts/posts.service';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material';

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
	totalPosts = 10;
	postsPerPage = 1;
	pageSizeOptions = [1,10,20,30];
	currentPage = 1;
	
	// shortcut way to define property in class is add public keyword in constructor's parameter
	constructor(public postsService: PostsService) { 

	}

	/*will be executed when angular create component*/
	ngOnInit() {
		this.postsService.getPosts(this.postsPerPage,1); // just trigger http request
		this.isLoading = true;
		this.postsSubscription = this.postsService.getPostUpdateListener()
			.subscribe((posts: Post[]) => {
				this.isLoading = false;
				this.posts = posts;
			});
	}

	ngOnDestroy(){
		this.postsSubscription.unsubscribe();
	}

	onDeletePost(postId: string){
		this.postsService.deletePost(postId)
	}

	onChangedPage(pageData: PageEvent){
		console.log("ganti");
		this.currentPage = pageData.pageIndex + 1;
		this.postsPerPage = pageData.pageSize;
		this.postsService.getPosts(this.postsPerPage,this.currentPage); // just trigger http request
		
	}
}