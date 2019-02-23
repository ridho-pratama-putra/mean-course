import { Post } from './post.model';

@Injectable({providedIn: 'root'});

export class PostsService {
	// array in js is object, reference type. if you copy it your object in memory will still the same. you just copy the address 
	private posts: Post[] = [];

	// to retrieve the post
	getPosts(){
		// true "copy" ing. three dots is to take all the elements of another array
		return [...this.posts];
	}

	addPosts(title : string, content : string){
		const post: Post = {
			title : title,
			content : content
		};

		// add new post
		this.posts.push(post);

	}

}