import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/shared/post.service';
import { CommentService } from 'src/app/comment/comment.service';
import { PostModel } from 'src/app/shared/post-model';
import { Commentpayload } from 'src/app/comment/comment.payload';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  name: string;
  posts: PostModel[];
  comments: Commentpayload[];
  postLength: number;
  commentLength: number;

  constructor(private activateRoute: ActivatedRoute, private postService: PostService,
     private commentService: CommentService) { 

       this.name = this.activateRoute.snapshot.params.name;

       this.postService.getAllPostsByUser(this.name).subscribe(data => {
         this.posts = data;
         this.postLength = data.length;
         console.log(this.postLength);
       });

       this.commentService.getAllCommentsByUser(this.name).subscribe(data => {
         this.comments = data;
         this.commentLength = data.length;
       })
     }

  ngOnInit(): void {}

}
