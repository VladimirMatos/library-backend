import { ConfigModule } from '@nestjs/config';
import configuration from '@Config/config';
import envValidationSchema from '@Config/env-validation-schema';

export const ConfigEnvModule = ConfigModule.forRoot({
  load: [() => ({ ...configuration() })],
  validationSchema: envValidationSchema,
});
