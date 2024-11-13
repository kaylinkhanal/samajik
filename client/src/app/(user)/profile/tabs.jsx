"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PostCard } from "@/components/shared/post-card"

export function ProfileTabs() {
  return (
    <Tabs defaultValue="posts" className="w-full">
      <TabsList className="w-full justify-start rounded-none border-b bg-transparent h-auto p-0">
        <TabsTrigger
          value="posts"
          className="rounded-none border-b-2 border-transparent px-6 py-3 data-[state=active]:border-orange-500 data-[state=active]:bg-transparent"
        >
          Posts
        </TabsTrigger>
        <TabsTrigger
          value="replies"
          className="rounded-none border-b-2 border-transparent px-6 py-3 data-[state=active]:border-orange-500 data-[state=active]:bg-transparent"
        >
          Replies
        </TabsTrigger>
        <TabsTrigger
          value="media"
          className="rounded-none border-b-2 border-transparent px-6 py-3 data-[state=active]:border-orange-500 data-[state=active]:bg-transparent"
        >
          Media
        </TabsTrigger>
        <TabsTrigger
          value="likes"
          className="rounded-none border-b-2 border-transparent px-6 py-3 data-[state=active]:border-orange-500 data-[state=active]:bg-transparent"
        >
          Likes
        </TabsTrigger>
      </TabsList>

      <TabsContent value="posts" className="divide-y">
        {[1, 2, 3].map((post) => (
          <PostCard key={post} />
        ))}
      </TabsContent>

      <TabsContent value="replies">
        <div className="p-4 text-center text-muted-foreground">
          No replies yet
        </div>
      </TabsContent>

      <TabsContent value="media">
        <div className="p-4 text-center text-muted-foreground">
          No media posts yet
        </div>
      </TabsContent>

      <TabsContent value="likes">
        <div className="p-4 text-center text-muted-foreground">
          No liked posts yet
        </div>
      </TabsContent>
    </Tabs>
  )
}
