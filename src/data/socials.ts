import { FaInstagram, FaLinkedinIn, FaTiktok, FaXTwitter, FaYoutube } from 'react-icons/fa6'
import type { IconType } from 'react-icons'

/**
 * The same handles as the Organization structured data in index.html — one list,
 * so the footer and the community page cannot drift apart the way two copies
 * would. Update the handles here and in index.html together, or not at all.
 */
export const socials: { label: string; href: string; Icon: IconType }[] = [
  { label: 'X', href: 'https://x.com/xelvic', Icon: FaXTwitter },
  { label: 'Instagram', href: 'https://instagram.com/xelvic', Icon: FaInstagram },
  { label: 'YouTube', href: 'https://youtube.com/@xelvic', Icon: FaYoutube },
  { label: 'TikTok', href: 'https://tiktok.com/@xelvic', Icon: FaTiktok },
  { label: 'LinkedIn', href: 'https://linkedin.com/company/xelvic', Icon: FaLinkedinIn },
]
