export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      admins: {
        Row: {
          center: string | null
          id: string
          name: string
        }
        Insert: {
          center?: string | null
          id: string
          name: string
        }
        Update: {
          center?: string | null
          id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "admins_center_fkey"
            columns: ["center"]
            isOneToOne: false
            referencedRelation: "sessions"
            referencedColumns: ["location"]
          },
          {
            foreignKeyName: "admins_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      sessions: {
        Row: {
          center_admin: string | null
          first_hour_attendance: string[] | null
          fourth_hour_attendance: string[] | null
          location: string
          second_hour_attendance: string[] | null
          third_hour_attendance: string[] | null
        }
        Insert: {
          center_admin?: string | null
          first_hour_attendance?: string[] | null
          fourth_hour_attendance?: string[] | null
          location: string
          second_hour_attendance?: string[] | null
          third_hour_attendance?: string[] | null
        }
        Update: {
          center_admin?: string | null
          first_hour_attendance?: string[] | null
          fourth_hour_attendance?: string[] | null
          location?: string
          second_hour_attendance?: string[] | null
          third_hour_attendance?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "sessions_center_admin_fkey"
            columns: ["center_admin"]
            isOneToOne: false
            referencedRelation: "admins"
            referencedColumns: ["id"]
          }
        ]
      }
      students: {
        Row: {
          belt: string
          center_admin: string | null
          icons: number[] | null
          nameplates: number[] | null
          nickname: string
          points: number
        }
        Insert: {
          belt?: string
          center_admin?: string | null
          icons?: number[] | null
          nameplates?: number[] | null
          nickname: string
          points?: number
        }
        Update: {
          belt?: string
          center_admin?: string | null
          icons?: number[] | null
          nameplates?: number[] | null
          nickname?: string
          points?: number
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

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
