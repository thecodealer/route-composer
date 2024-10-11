# Route Composer for Express.js
This is an Express.js library that makes it easy to composer routes similar to Laravel. It has the ability to group related routes and apply middleware or prefix.

## Installation
```
npm install route-composer
```

## Usage

```
import { StatusController } from '../controllers/statusController';
import { Composer } from 'route-composer';

export default Composer.group().routes([
  {
    path: '/status',
    method: 'get',
    controller: StatusController.index,
  },
]);
```
### URL Prefixing
Prefix URLs for related routes
```
export default Composer
  .group()
  .prefix('/pages')
  .routes([
    {
      path: '/one',
      method: 'get',
      controller: PagesController.one,
    },
    {
      path: '/two',
      method: 'get',
      controller: (req, res) => {
        res.json({ message: 'page one' });
      },
    },
  ]);
```
This will produce the routes `/pages/one` and `/pages/two`
### Middleware
Apply middleware to a group of routes
```
const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // check auth logic
  next();
};


export default Composer
  .group()
  .middleware(authMiddleware)
  .prefix('/auth')
  .routes([
    {
      path: '/login',
      method: 'get',
      controller: AuthController.login,
    },
    {
      path: '/logout',
      method: 'get',
      controller: AuthController.logout,
    },
  ]);
```