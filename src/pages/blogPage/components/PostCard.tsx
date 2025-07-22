import React from 'react'
import styles from "../BlogPage.module.css";
import { Eye, ThumbsUp, ThumbsDown, Tag } from 'lucide-react';

type PostCardProps = {
    post: {
        title: string;
        body: string;
        tags: string[];
        reactions: {
            likes: number;
            dislikes: number;
        };
        views: number;
    };
    onClick: (post: any) => void;
    isHovered: boolean;
    onHover: React.MouseEventHandler<HTMLDivElement>;
    onLeave: React.MouseEventHandler<HTMLDivElement>;
};

const PostCard: React.FC<PostCardProps> = ({ post, onClick, isHovered, onHover, onLeave }) => {
    return (
        <div>
            <div
                className={`${styles.postCard} ${isHovered ? styles.postCardHover : ''}`}
                onClick={() => onClick(post)}
                onMouseEnter={onHover}
                onMouseLeave={onLeave}
            >
                <h3 className={styles.postTitle}>{post.title}</h3>
                <p className={styles.postBody}>{post.body}</p>

                <div className={styles.tagsContainer}>
                    {post.tags.map((tag, index) => (
                        <span key={index} className={styles.tag}>
                            <Tag size={12} />
                            {tag}
                        </span>
                    ))}
                </div>

                <div className={styles.postMeta}>
                    <div className={styles.reactions}>
                        <div className={styles.reactionItem}>
                            <ThumbsUp size={16} color="#10b981" />
                            <span>{post.reactions.likes}</span>
                        </div>
                        <div className={styles.reactionItem}>
                            <ThumbsDown size={16} color="#ef4444" />
                            <span>{post.reactions.dislikes}</span>
                        </div>
                    </div>
                    <div className={styles.views}>
                        <Eye size={16} />
                        <span>{post.views}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostCard
