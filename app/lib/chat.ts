import { supabase } from './supabase';

export type ChatMessage = {
  id: string;
  content: string;
  sender: "user" | "bot";
  created_at: string;
  attachment?: {
    type: "image" | "pdf" | "link";
    url: string;
    name: string;
  };
};

export async function saveChatMessage(
  userId: string,
  content: string,
  isUser: boolean,
  attachment?: {
    type: "image" | "pdf" | "link";
    url: string;
    name: string;
  }
): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('chat_history')
      .insert({
        user_id: userId,
        message: content,
        is_user: isUser,
        attachment: attachment ? JSON.stringify(attachment) : null
      });

    if (error) {
      console.error('Error saving chat message:', error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Unexpected error saving chat message:', error);
    return false;
  }
}

export async function getChatHistory(userId: string): Promise<ChatMessage[]> {
  try {
    const { data, error } = await supabase
      .from('chat_history')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching chat history:', error);
      return [];
    }
    
    return data.map(item => ({
      id: item.id,
      content: item.message,
      sender: item.is_user ? 'user' : 'bot',
      created_at: item.created_at,
      attachment: item.attachment ? JSON.parse(item.attachment) : undefined
    }));
  } catch (error) {
    console.error('Unexpected error fetching chat history:', error);
    return [];
  }
} 