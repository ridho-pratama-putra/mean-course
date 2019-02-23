import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Post } from './post.model';

@Injectable({providedIn: 'root'})

export class PostsService {
	// array in js is object, reference type. if you copy it your object in memory will still the same. you just copy the address 
	private posts: Post[] = [];
	private postUpdated = new Subject<Post[]>();

	// to retrieve the post
	getPosts(){
		// true "copy" ing. three dots is to take all the elements of another array
		return [...this.posts];
	}

	getPostUpdateListener(){
		return this.postUpdated.asObservable();
	}

	addPosts(title : string, content : string){
		const post: Post = {
			title : title,
			content : content
		};

		// update the post
		this.posts.push(post)

		this.postUpdated.next([...this.posts])

	}

}