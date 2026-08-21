"use client"

import { useState } from "react"
import { Calendar, ChevronRight } from "lucide-react"
import styles from "@/styles/Blog.module.css"
import { blogPosts } from "@/data/blogPosts"
import type { BlogPost } from "@/types/blog"
import BlogModal from "./BlogModal"

export default function Blog() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)
  const [modalOpen, setModalOpen] = useState(false)

  const openModal = (post: BlogPost) => {
    setSelectedPost(post)
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
  }

  return (
    <>
      <section id="blog" className={styles.blog}>
        <div className={styles.container}>
          <h2>Blog de Psicología</h2>
          <p className={styles.subtitle}>Artículos y consejos para tu bienestar emocional</p>

          <div className={styles.blogGrid}>
            {blogPosts.map((post) => (
              <div key={post.id} className={styles.blogCard} onClick={() => openModal(post)}>
                <div className={styles.blogImage}>
                  <img src={post.image || "/placeholder.svg"} alt={post.title} />
                </div>
                <div className={styles.blogContent}>
                  <h3 className={styles.blogTitle}>{post.title}</h3>
                  <p className={styles.blogExcerpt}>{post.excerpt}</p>
                  <div className={styles.blogDate}>
                    <Calendar size={14} />
                    <span>{post.date}</span>
                  </div>
                  <div className={styles.readMore}>
                    Leer más <ChevronRight size={16} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedPost && <BlogModal post={selectedPost} isOpen={modalOpen} onClose={closeModal} />}
    </>
  )
}
