"use client"

import { X, Calendar } from "lucide-react"
import styles from "@/styles/Blog.module.css"
import type { BlogPost } from "@/types/blog"

interface BlogModalProps {
  post: BlogPost
  isOpen: boolean
  onClose: () => void
}

export default function BlogModal({ post, isOpen, onClose }: BlogModalProps) {
  if (!isOpen) return null

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          <X size={24} />
        </button>

        <div className={styles.modalImage}>
          <img src={post.image || "/placeholder.svg"} alt={post.title} />
        </div>

        <div className={styles.modalContent}>
          <h2 className={styles.modalTitle}>{post.title}</h2>
          <div className={styles.modalDate}>
            <Calendar size={16} />
            <span>{post.date}</span>
          </div>

          <div className={styles.modalText} dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
      </div>
    </div>
  )
}
