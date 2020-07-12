import { Request, Response, NextFunction } from 'express';
import { createNamespace, Namespace } from 'continuation-local-storage';
import { getConnectionBySlug } from '../connectionManager';

const nameSpace: Namespace = createNamespace('tenant_context');

export function resolve(req: Request, res: Response, next: NextFunction) {
  const slug = req.query.slug;

  if (!slug) {
    res.json({ message: `Please provide a tenant's slug to connect. ` });
  }

  nameSpace.run(() => {
    nameSpace.set('connection', getConnectionBySlug(slug));
    next();
  });
}
