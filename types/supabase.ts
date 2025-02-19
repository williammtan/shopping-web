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
      master_products: {
        Row: {
          id: number
          name: string
          image_url: string | null
        }
        Insert: {
          id?: number
          name: string
          image_url?: string | null
        }
        Update: {
          id?: number
          name?: string
          image_url?: string | null
        }
      }
      products: {
        Row: {
          id: number
          master_product_id: number
          name: string
          description: string | null
          url: string
          marketplace: string
          category_breadcrumb: string | null
          price: number
          strike_price: number | null
          weight: string | null
          brand: string | null
          stock: number | null
          shop_name: string | null
          shop_domain: string | null
          rating: number | null
          review_count: number | null
          view_count: number | null
          sale_count: number | null
        }
        Insert: {
          id?: number
          master_product_id: number
          name: string
          description?: string | null
          url: string
          marketplace: string
          category_breadcrumb?: string | null
          price: number
          strike_price?: number | null
          weight?: string | null
          brand?: string | null
          stock?: number | null
          shop_name?: string | null
          shop_domain?: string | null
          rating?: number | null
          review_count?: number | null
          view_count?: number | null
          sale_count?: number | null
        }
        Update: {
          id?: number
          master_product_id?: number
          name?: string
          description?: string | null
          url?: string
          marketplace?: string
          category_breadcrumb?: string | null
          price?: number
          strike_price?: number | null
          weight?: string | null
          brand?: string | null
          stock?: number | null
          shop_name?: string | null
          shop_domain?: string | null
          rating?: number | null
          review_count?: number | null
          view_count?: number | null
          sale_count?: number | null
        }
      }
      product_image_urls: {
        Row: {
          id: number
          product_id: number
          image_url: string
        }
        Insert: {
          id?: number
          product_id: number
          image_url: string
        }
        Update: {
          id?: number
          product_id?: number
          image_url?: string
        }
      }
    }
  }
}