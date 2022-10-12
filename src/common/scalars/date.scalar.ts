import { CustomScalar, Scalar } from '@nestjs/graphql';
import { Kind, ValueNode } from 'graphql';

@Scalar('Date', () => Date)
export class DateScalar implements CustomScalar<number, Date> {
  description = 'Date custom scalar type';

  parseValue(value: number): Date {
    try {
      const number = Number(value);
      return value !== null ? new Date(number) : null;
    } catch {
      return null;
    }
  }

  serialize(value: Date): number {
    return value instanceof Date ? value.getTime() : null; // value sent to the client
  }

  parseLiteral(ast: ValueNode): Date {
    if (ast.kind === Kind.INT || ast.kind === Kind.STRING) {
      try {
        const number = Number(ast.value);
        return new Date(number);
      } catch {
        return null;
      }
    }
    return null;
  }
}
