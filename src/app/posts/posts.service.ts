import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'

import { Post } from './post.model'
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators'
import { Router } from '@angular/router';
@Injectable({providedIn: 'root'})

export class PostsService {
	// array in js is object, reference type. if you copy it your object in memory will still the same. you just copy the address 
	private posts: Post[] = [];
	private postsUpdated = new Subject<Post[]>();

	constructor(private http: HttpClient, private router: Router){}

	// to retrieve the posts
	getPosts(){
		// dijadikan any karena id di mongodb adlaah _id. karena post di angular bentuknya id tapi dari database _id. jadi dibikin any dulu. lalu ditransforming
		// di transforming biar cocok sama tatanan data di angular(di post model)
		this.http.get <{message: string, posts: any}>('http://localhost:3000/api/posts')
			.pipe(map((postedData) => {
				return postedData.posts.map(post => {
					return {
						title: post.title,
						content: post.content,
						id: post._id,
						imagePath: post.imagePath
					}
				})
			}))
			.subscribe((transformedPosts) => {
				this.posts = transformedPosts
				this.postsUpdated.next([...this.posts])
			});
	}

	getPostUpdateListener(){
		return this.postsUpdated.asObservable();
	}

	addPost(title : string, content : string, image : File){
		const postData = new FormData();
		postData.append("title",title);
		postData.append("content",content);

		// third is file name provide to backend. fourth is title to give image name
		postData.append("image",image, title);

		// angular http will detect that we got a non-JSON data (because we send image)

		this.http
			.post<{ message: string , post: Post}>("http://localhost:3000/api/posts", postData)
			.subscribe(responseData => {
				const post: Post = {
					id: responseData.post.id,
					title: responseData.post.title,
					content: responseData.post.content,
					imagePath: responseData.post.imagePath
				};
				this.posts.push(post);
				this.postsUpdated.next([...this.posts]);
				this.router.navigate(['/'])
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

	updatePost(id: string, title:string, content:string, image: File | string){
		let postData : Post | FormData;
		if(typeof(image) === 'object'){
			postData = new FormData();
			postData.append("id",id);
			postData.append("title",title);
			postData.append("content",content);
			postData.append("image",image,title);
		} else{
			postData = {
				id:id,
				title:title,
				content:content,
				imagePath:image
			}
		}
		
		this.http.put("http://localhost:3000/api/posts/"+id,postData)
			.subscribe(response => {
				// post sisi client yang belum diupdate
				const updatedPost = [...this.posts];
				const oldPostIndex = updatedPost.findIndex(p => p.id === id);
				const post: Post = {
					id:id,
					title:title,
					content:content,
					imagePath:""
				};
				updatedPost[oldPostIndex] = post;
				this.posts = updatedPost;
				this.postsUpdated.next([...this.posts]);
				this.router.navigate(['/'])
			})
	}

	getPost(id: string){
		// return {...this.posts.find(p => p.id === id)}
		return this.http.get<{_id: string,title: string,content: string, imagePath: string}>("http://localhost:3000/api/posts/"+id);
	}

}