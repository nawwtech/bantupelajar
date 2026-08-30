import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

const SUPABASE_URL = 'https://deylaklrprkfgrljcvzl.supabase.co'

// GANTI INI dengan Supabase Publishable/Anon Key kamu
const SUPABASE_ANON_KEY = 'sb_publishable_1utz4sLoZ07HRiht3f-B8g_EIwhNVuo'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const next = requestUrl.searchParams.get('next') || '/'

  if (!code) {
    return NextResponse.redirect(
      new URL('/login?error=missing_code', requestUrl.origin)
    )
  }

  const cookieStore = await cookies()

  const supabase = createServerClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },

        setAll(
          items: {
            name: string
            value: string
            options?: {
              domain?: string
              expires?: Date
              httpOnly?: boolean
              maxAge?: number
              path?: string
              sameSite?: boolean | 'lax' | 'strict' | 'none'
              secure?: boolean
            }
          }[]
        ) {
          try {
            items.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options)
            })
          } catch {
            // Cookie store may be read-only in some server contexts.
          }
        },
      },
    }
  )

  const { error } = await supabase.auth.exchangeCodeForSession(code)

  if (error) {
    console.error('Supabase OAuth callback error:', error)

    return NextResponse.redirect(
      new URL(
        `/login?error=${encodeURIComponent(error.message)}`,
        requestUrl.origin
      )
    )
  }

  return NextResponse.redirect(
    new URL(next, requestUrl.origin)
  )
}
