import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'

import { Post } from './post.model'
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators'
@Injectable({providedIn: 'root'})

export class PostsService {
	// array in js is object, reference type. if you copy it your object in memory will still the same. you just copy the address 
	private posts: Post[] = [];
	private postsUpdated = new Subject<Post[]>();

	constructor(private http: HttpClient){}

	// to retrieve the post
	getPosts(){
		// dijadikan any karena id di mongodb adlaah _id. di transforming dulu biar cocok sama tatanan data di angular(di post model)
		this.http.get <{message: string, posts: any}>('http://localhost:3000/api/posts')
			.pipe(map((postedData) => {
				return postedData.posts.map(post => {
					return {
						title: post.title,
						conten: post.content,
						id: post._id
					}
				})
			}))
			.subscribe((transformedPosts) => {
				this.posts = transformedPosts
				this.postsUpdated.next([...this.posts])
			})
	}

	getPostUpdateListener(){
		return this.postsUpdated.asObservable();
	}

	addPost(title : string, content : string){
		const post: Post = { id: null, title : title,content : content };

		this.http
			.post<{ message: string , createdPostId: string}>("http://localhost:3000/api/posts", post)
			.subscribe(responseData => {
				// console.log(responseData);
				// const createdId = 
				post.id = responseData.createdPostId
				this.posts.push(post)
				this.postsUpdated.next([...this.posts])
			})
		// console.log(this.posts)
	}

	deletePost(postId: string){
		this.http.delete("http://localhost:3000/api/posts/"+postId)
			.subscribe(() => {
				const updatedPostAfterDelete = this.posts.filter(post => post.id !== postId)
				this.posts = updatedPostAfterDelete
				this.postsUpdated.next([...this.posts])
			})
	}

}