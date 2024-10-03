const { User, Post, Comment } = require('../models');

async function getPosts(req, userId) {
    let posts = [];
    if(userId) { 
        posts = await Post.findAll({ where: { userId: userId }, include: [{ model: User, attributes: ['username'] },], raw: true,});
    } else { 
        posts = await Post.findAll({ include: [{ model: User, attributes: ['username'] },], raw: true,});
    }
    
    for (const post of posts) {
        post.user = req.session?.user;
        post.author = (await User.findByPk(post.userId)).username;
        post.canDelete = req.session?.user?.id === post.userId;
        post.date = new Date(post.createdAt).toLocaleDateString('en-US', { year:'numeric', month:'long', day:'numeric'}); 
        post.comments = await Comment.findAll({ where: { postId: post.id }, raw: true,});  //console.log(post.comments)  
        for (const comment of post.comments) { 
            comment.author = (await User.findByPk(comment.userId)).username;
            comment.canDelete = req.session?.user?.id === comment.userId;
            comment.date = new Date(comment.createdAt).toLocaleDateString('en-US', { year:'numeric', month:'long', day:'numeric'}); 
        };
    };

    posts.reverse();
    return posts;
}

module.exports = getPosts;