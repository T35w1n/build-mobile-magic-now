export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      conversations: {
        Row: {
          created_at: string | null
          id: string
          updated_at: string | null
          user1_id: string
          user2_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          updated_at?: string | null
          user1_id: string
          user2_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          updated_at?: string | null
          user1_id?: string
          user2_id?: string
        }
        Relationships: []
      }
      event_chats: {
        Row: {
          created_at: string | null
          event_id: string
          id: string
          message: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          event_id: string
          id?: string
          message: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          event_id?: string
          id?: string
          message?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "event_chats_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          banner_image: string | null
          commission_rate: number | null
          created_at: string | null
          description: string | null
          event_date: string
          guest_limit: number
          id: string
          location: string
          promoter_id: string
          status: Database["public"]["Enums"]["event_status"] | null
          ticket_price: number
          ticket_quantity: number
          tickets_sold: number | null
          title: string
          updated_at: string | null
        }
        Insert: {
          banner_image?: string | null
          commission_rate?: number | null
          created_at?: string | null
          description?: string | null
          event_date: string
          guest_limit: number
          id?: string
          location: string
          promoter_id: string
          status?: Database["public"]["Enums"]["event_status"] | null
          ticket_price?: number
          ticket_quantity?: number
          tickets_sold?: number | null
          title: string
          updated_at?: string | null
        }
        Update: {
          banner_image?: string | null
          commission_rate?: number | null
          created_at?: string | null
          description?: string | null
          event_date?: string
          guest_limit?: number
          id?: string
          location?: string
          promoter_id?: string
          status?: Database["public"]["Enums"]["event_status"] | null
          ticket_price?: number
          ticket_quantity?: number
          tickets_sold?: number | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      "love ra": {
        Row: {
          created_at: string
          id: number
        }
        Insert: {
          created_at?: string
          id?: number
        }
        Update: {
          created_at?: string
          id?: number
        }
        Relationships: []
      }
      matches: {
        Row: {
          action: string
          created_at: string | null
          id: string
          is_mutual: boolean | null
          target_user_id: string
          user_id: string
        }
        Insert: {
          action: string
          created_at?: string | null
          id?: string
          is_mutual?: boolean | null
          target_user_id: string
          user_id: string
        }
        Update: {
          action?: string
          created_at?: string | null
          id?: string
          is_mutual?: boolean | null
          target_user_id?: string
          user_id?: string
        }
        Relationships: []
      }
      messages: {
        Row: {
          content: string
          conversation_id: string
          created_at: string | null
          id: string
          message_type: string | null
          read_at: string | null
          sender_id: string
        }
        Insert: {
          content: string
          conversation_id: string
          created_at?: string | null
          id?: string
          message_type?: string | null
          read_at?: string | null
          sender_id: string
        }
        Update: {
          content?: string
          conversation_id?: string
          created_at?: string | null
          id?: string
          message_type?: string | null
          read_at?: string | null
          sender_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          amount: number
          commission_amount: number
          created_at: string | null
          id: string
          net_amount: number
          payer_id: string
          processed_at: string | null
          status: Database["public"]["Enums"]["payment_status"] | null
          stripe_payment_intent_id: string | null
          ticket_id: string
        }
        Insert: {
          amount: number
          commission_amount: number
          created_at?: string | null
          id?: string
          net_amount: number
          payer_id: string
          processed_at?: string | null
          status?: Database["public"]["Enums"]["payment_status"] | null
          stripe_payment_intent_id?: string | null
          ticket_id: string
        }
        Update: {
          amount?: number
          commission_amount?: number
          created_at?: string | null
          id?: string
          net_amount?: number
          payer_id?: string
          processed_at?: string | null
          status?: Database["public"]["Enums"]["payment_status"] | null
          stripe_payment_intent_id?: string | null
          ticket_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "payments_ticket_id_fkey"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "tickets"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          age: number | null
          bio: string | null
          company: string | null
          created_at: string | null
          education: string | null
          email: string | null
          full_name: string | null
          height: number | null
          id: string
          interested_in: string | null
          interests: Json | null
          is_pro: boolean | null
          job_title: string | null
          languages: string[] | null
          lifestyle_habits: Json | null
          location: string | null
          personality_traits: Json | null
          photos: string[] | null
          race: string | null
          sexual_preference: string | null
          updated_at: string | null
          user_role: Database["public"]["Enums"]["user_role"] | null
          values_beliefs: Json | null
          verified: boolean | null
        }
        Insert: {
          age?: number | null
          bio?: string | null
          company?: string | null
          created_at?: string | null
          education?: string | null
          email?: string | null
          full_name?: string | null
          height?: number | null
          id: string
          interested_in?: string | null
          interests?: Json | null
          is_pro?: boolean | null
          job_title?: string | null
          languages?: string[] | null
          lifestyle_habits?: Json | null
          location?: string | null
          personality_traits?: Json | null
          photos?: string[] | null
          race?: string | null
          sexual_preference?: string | null
          updated_at?: string | null
          user_role?: Database["public"]["Enums"]["user_role"] | null
          values_beliefs?: Json | null
          verified?: boolean | null
        }
        Update: {
          age?: number | null
          bio?: string | null
          company?: string | null
          created_at?: string | null
          education?: string | null
          email?: string | null
          full_name?: string | null
          height?: number | null
          id?: string
          interested_in?: string | null
          interests?: Json | null
          is_pro?: boolean | null
          job_title?: string | null
          languages?: string[] | null
          lifestyle_habits?: Json | null
          location?: string | null
          personality_traits?: Json | null
          photos?: string[] | null
          race?: string | null
          sexual_preference?: string | null
          updated_at?: string | null
          user_role?: Database["public"]["Enums"]["user_role"] | null
          values_beliefs?: Json | null
          verified?: boolean | null
        }
        Relationships: []
      }
      tickets: {
        Row: {
          attendee_id: string
          created_at: string | null
          event_id: string
          id: string
          purchase_price: number
          qr_code: string | null
          status: Database["public"]["Enums"]["ticket_status"] | null
          ticket_code: string
          updated_at: string | null
          used_at: string | null
        }
        Insert: {
          attendee_id: string
          created_at?: string | null
          event_id: string
          id?: string
          purchase_price: number
          qr_code?: string | null
          status?: Database["public"]["Enums"]["ticket_status"] | null
          ticket_code: string
          updated_at?: string | null
          used_at?: string | null
        }
        Update: {
          attendee_id?: string
          created_at?: string | null
          event_id?: string
          id?: string
          purchase_price?: number
          qr_code?: string | null
          status?: Database["public"]["Enums"]["ticket_status"] | null
          ticket_code?: string
          updated_at?: string | null
          used_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tickets_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_ticket_code: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
    }
    Enums: {
      event_status: "draft" | "published" | "featured" | "cancelled"
      payment_status: "pending" | "completed" | "failed" | "refunded"
      ticket_status: "pending" | "paid" | "cancelled" | "refunded"
      user_role: "attendee" | "promoter" | "admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      event_status: ["draft", "published", "featured", "cancelled"],
      payment_status: ["pending", "completed", "failed", "refunded"],
      ticket_status: ["pending", "paid", "cancelled", "refunded"],
      user_role: ["attendee", "promoter", "admin"],
    },
  },
} as const
