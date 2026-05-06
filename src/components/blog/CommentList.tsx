import { formatDate } from '@/lib/utils'

interface Comment {
  id: string
  nickname: string
  content: string
  created_at: string
}

interface CommentListProps {
  comments: Comment[]
}

export default function CommentList({ comments }: CommentListProps) {
  if (comments.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-warm-600">暂无评论，来抢沙发吧！</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {comments.map((comment) => (
        <div
          key={comment.id}
          className="bg-white rounded-xl border border-cream-300 p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-cream-200 flex items-center justify-center">
                <span className="text-warm-600 font-semibold">
                  {comment.nickname.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <h4 className="font-semibold text-warm-900">{comment.nickname}</h4>
                <time className="text-sm text-warm-500">
                  {formatDate(comment.created_at)}
                </time>
              </div>
            </div>
          </div>
          <p className="text-warm-700 whitespace-pre-wrap">{comment.content}</p>
        </div>
      ))}
    </div>
  )
}
