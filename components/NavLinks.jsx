import Link from 'next/link';
const links = [
  { href: '/lessons', label: 'lessons' },
  { href: '/lessons/new-lesson', label: 'new lesson' },
  { href: '/chat', label: 'chat' }
  
  //{ href: '/profile', label: 'profile' },
];

const NavLinks = () => {
  return (
    <ul className='menu  text-base-content'>
      {links.map((link) => {
        return (
          <li key={link.href}>
            <Link href={link.href} className='capitalize'>
              {link.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
export default NavLinks;
