import React from "react";
import styles from "../BlogPage.module.css";
import { ArrowLeft, Tag, ThumbsUp, ThumbsDown, Eye } from "lucide-react";

interface Post {
  title: string;
  body: string;
  tags: string[];
  reactions: { likes: number; dislikes: number };
  views: number;
  userId: number;
}

interface BlogDetailPageProps {
  post: Post | null;
  onBack?: () => void;
  isBackHovered?: boolean;
  onBackHover?: () => void;
  onBackLeave?: () => void;
}

export const BlogDetailPage: React.FC<BlogDetailPageProps> = ({
  post,
  onBack,
  isBackHovered,
  onBackHover,
  onBackLeave,
}) => {
  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.detailView}>
      {onBack && (
        <button
          className={`${styles.backButton} ${isBackHovered ? styles.backButtonHover : ""}`}
          onClick={onBack}
          onMouseEnter={onBackHover}
          onMouseLeave={onBackLeave}
        >
          <ArrowLeft size={16} />
          Back to Posts
        </button>
      )}

      <h1 className={styles.detailTitle}>{post.title}</h1>
      <p className={styles.detailBody}>{post.body}</p>

      <div className={styles.detailTags}>
        {post.tags.map((tag, index) => (
          <span key={index} className={styles.detailTag}>
            <Tag size={14} />
            {tag}
          </span>
        ))}
      </div>

      <div className={styles.detailMeta}>
        <div className={styles.metaItem}>
          <div className={styles.metaLabel}>Likes</div>
          <div className={styles.metaValue}>
            <ThumbsUp size={20} color="#10b981" />
            {post.reactions.likes}
          </div>
        </div>
        <div className={styles.metaItem}>
          <div className={styles.metaLabel}>Dislikes</div>
          <div className={styles.metaValue}>
            <ThumbsDown size={20} color="#ef4444" />
            {post.reactions.dislikes}
          </div>
        </div>
        <div className={styles.metaItem}>
          <div className={styles.metaLabel}>Views</div>
          <div className={styles.metaValue}>
            <Eye size={20} color="#6b7280" />
            {post.views}
          </div>
        </div>
        <div className={styles.metaItem}>
          <div className={styles.metaLabel}>User ID</div>
          <div className={styles.metaValue}>#{post.userId}</div>
        </div>
      </div>
    </div>
  );
}