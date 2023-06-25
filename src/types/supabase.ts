export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      notification: {
        Row: {
          body: string
          created_at: string
          id: string
          title: string
          url: string | null
        }
        Insert: {
          body?: string
          created_at?: string
          id?: string
          title?: string
          url?: string | null
        }
        Update: {
          body?: string
          created_at?: string
          id?: string
          title?: string
          url?: string | null
        }
        Relationships: []
      }
      subscription: {
        Row: {
          auth: string
          created_at: string | null
          endpoint: string
          id: string
          p256dh: string
        }
        Insert: {
          auth: string
          created_at?: string | null
          endpoint: string
          id: string
          p256dh: string
        }
        Update: {
          auth?: string
          created_at?: string | null
          endpoint?: string
          id?: string
          p256dh?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
