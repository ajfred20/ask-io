import { supabase } from './supabase';

export interface UserCredits {
  id: string;
  user_id: string;
  total_credits: number;
  used_credits: number;
  last_updated: string;
}

// Cost in credits for different operations
export const CREDIT_COSTS = {
  TEXT_QUERY: 1,
  FILE_ANALYSIS: 5,
  LINK_ANALYSIS: 3,
};

// Get user credits
export async function getUserCredits(userId: string): Promise<UserCredits | null> {
  try {
    // First check if the user has a credits record
    const { data, error } = await supabase
      .from('user_credits')
      .select('*')
      .eq('user_id', userId)
      .single();
    
    if (error && error.code !== 'PGSQL_ERROR_NO_ROWS') {
      console.error('Error fetching user credits:', error);
      return null;
    }
    
    // If no record exists, create one with default credits
    if (!data) {
      const defaultCredits = 100; // New users get 100 free credits
      const { data: newData, error: insertError } = await supabase
        .from('user_credits')
        .insert({
          user_id: userId,
          total_credits: defaultCredits,
          used_credits: 0,
          last_updated: new Date().toISOString()
        })
        .select()
        .single();
      
      if (insertError) {
        console.error('Error creating user credits:', insertError);
        return null;
      }
      
      return newData as UserCredits;
    }
    
    return data as UserCredits;
  } catch (error) {
    console.error('Unexpected error getting user credits:', error);
    return null;
  }
}

// Use credits for an operation
export async function useCredits(userId: string, operation: keyof typeof CREDIT_COSTS): Promise<boolean> {
  try {
    const credits = await getUserCredits(userId);
    if (!credits) return false;
    
    const costAmount = CREDIT_COSTS[operation];
    const remainingCredits = credits.total_credits - credits.used_credits;
    
    // Check if user has enough credits
    if (remainingCredits < costAmount) {
      return false;
    }
    
    // Update used credits
    const { error } = await supabase
      .from('user_credits')
      .update({
        used_credits: credits.used_credits + costAmount,
        last_updated: new Date().toISOString()
      })
      .eq('user_id', userId);
    
    if (error) {
      console.error('Error updating user credits:', error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Unexpected error using credits:', error);
    return false;
  }
}

// Add credits to a user's account
export async function addCredits(userId: string, amount: number): Promise<boolean> {
  try {
    const credits = await getUserCredits(userId);
    if (!credits) return false;
    
    const { error } = await supabase
      .from('user_credits')
      .update({
        total_credits: credits.total_credits + amount,
        last_updated: new Date().toISOString()
      })
      .eq('user_id', userId);
    
    if (error) {
      console.error('Error adding credits:', error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Unexpected error adding credits:', error);
    return false;
  }
}

// Get credit usage history
export async function getCreditUsageHistory(userId: string): Promise<any[]> {
  try {
    const { data, error } = await supabase
      .from('credit_usage_history')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching credit usage history:', error);
      return [];
    }
    
    return data;
  } catch (error) {
    console.error('Unexpected error getting credit usage history:', error);
    return [];
  }
}

// Log credit usage
export async function logCreditUsage(
  userId: string, 
  operation: keyof typeof CREDIT_COSTS, 
  description: string
): Promise<boolean> {
  try {
    const costAmount = CREDIT_COSTS[operation];
    
    const { error } = await supabase
      .from('credit_usage_history')
      .insert({
        user_id: userId,
        operation,
        credits_used: costAmount,
        description,
        created_at: new Date().toISOString()
      });
    
    if (error) {
      console.error('Error logging credit usage:', error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Unexpected error logging credit usage:', error);
    return false;
  }
} 