import styles from "./BlogPage.module.css";
import React, { useState } from 'react';
import { BlogDetailPage } from "./blogDetail/BlogDetailPage";
import PostCard from "./components/PostCard";

const BlogPage: React.FC = () => {

  const [selectedPost, setSelectedPost] = useState(null);
  const [isBackHovered, setIsBackHovered] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const sampleData = {
    posts: [
      {
        id: 1,
        title: "His mother had always taught him",
        body: "His mother had always taught him not to ever think of himself as better than others. He'd tried to live by this motto. He never looked down on those who were less fortunate or who had less money than him. But the stupidity of the group of people he was talking to made him change his mind.",
        tags: ["history", "american", "crime"],
        reactions: {
          likes: 192,
          dislikes: 25
        },
        views: 305,
        userId: 121
      },
      {
        id: 2,
        title: "The Art of Digital Minimalism",
        body: "In our hyperconnected world, the concept of digital minimalism has gained significant traction. It's about being more intentional with technology, using it to support your values and goals rather than letting it control your life. This philosophy encourages us to declutter our digital lives and focus on what truly matters.",
        tags: ["technology", "lifestyle", "productivity"],
        reactions: {
          likes: 284,
          dislikes: 12
        },
        views: 542,
        userId: 89
      },
      {
        id: 3,
        title: "Climate Change and Urban Planning",
        body: "Urban planners are increasingly incorporating climate resilience into their designs. From green infrastructure to sustainable transportation systems, cities are adapting to face the challenges of a changing climate. This shift represents a fundamental change in how we think about urban development.",
        tags: ["environment", "urban", "sustainability"],
        reactions: {
          likes: 156,
          dislikes: 8
        },
        views: 398,
        userId: 76
      },
      {
        id: 4,
        title: "Climate Change and Urban Planning",
        body: "Urban planners are increasingly incorporating climate resilience into their designs. From green infrastructure to sustainable transportation systems, cities are adapting to face the challenges of a changing climate. This shift represents a fundamental change in how we think about urban development.",
        tags: ["environment", "urban", "sustainability"],
        reactions: {
          likes: 156,
          dislikes: 8
        },
        views: 398,
        userId: 76
      },
      {
        id: 5,
        title: "Climate Change and Urban Planning",
        body: "Urban planners are increasingly incorporating climate resilience into their designs. From green infrastructure to sustainable transportation systems, cities are adapting to face the challenges of a changing climate. This shift represents a fundamental change in how we think about urban development.",
        tags: ["environment", "urban", "sustainability"],
        reactions: {
          likes: 156,
          dislikes: 8
        },
        views: 398,
        userId: 76
      }
    ],
    total: 251,
    skip: 0,
    limit: 30
  };


  const handlePostClick = (post: any) => {
    setSelectedPost(post);
  };

  const handleBackClick = () => {
    setSelectedPost(null);
  };

  return (
    <div className={styles.app}>
      <div className={styles.container}>
        {selectedPost ? (
          <BlogDetailPage
            post={selectedPost}
            onBack={handleBackClick}
            isBackHovered={isBackHovered}
            onBackHover={() => setIsBackHovered(true)}
            onBackLeave={() => setIsBackHovered(false)}
          />
        ) : (
          <>
            <div className={styles.header}>
              <h1 className={styles.title}>Blog Posts</h1>
              <p className={styles.subtitle}>Discover interesting stories and insights</p>
            </div>

            <div className={styles.postsGrid}>
              {sampleData.posts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  onClick={handlePostClick}
                  isHovered={hoveredCard === post.id}
                  onHover={() => setHoveredCard(post.id)}
                  onLeave={() => setHoveredCard(null)}
                />
              ))}
            </div>

            <div className={styles.pagination}>
              <span>Showing {sampleData.skip + 1}-{Math.min(sampleData.skip + sampleData.limit, sampleData.total)} of {sampleData.total} posts</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
