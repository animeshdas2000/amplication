import {
  CodeBuildClient,
  StartBuildCommand,
  StartBuildCommandInput,
} from '@aws-sdk/client-codebuild';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CODE_BUILD_PROJECT_NAME } from 'src/constants';

@Injectable()
export class CodeBuildService {
  private readonly codeBuildClient: CodeBuildClient;

  constructor(private readonly configService: ConfigService) {
    this.codeBuildClient = new CodeBuildClient({});
  }

  async runBuild(contextArchivePath: string) {
    const sbci: StartBuildCommandInput = {
      projectName: this.configService.get<string>(CODE_BUILD_PROJECT_NAME),
      sourceLocationOverride: contextArchivePath,
    };

    const sbc = new StartBuildCommand(sbci);

    try {
      await this.codeBuildClient.send(sbc);
    } catch (err) {
      console.log(err);
    }
  }
}