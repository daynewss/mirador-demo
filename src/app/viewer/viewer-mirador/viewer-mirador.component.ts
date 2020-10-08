import { Component, OnInit } from '@angular/core';

import LocalStorageAdapter from 'mirador-annotations/es/LocalStorageAdapter';
import Mirador from 'mirador/dist/es/src/index';
import miradorAnnotationPlugin from 'mirador-annotations/es/index';
import miradorImageToolsPlugin from 'mirador-image-tools/es/plugins/miradorImageToolsPlugin';
import miradorShareDialogPlugin from 'mirador-share-plugin/es/MiradorShareDialog';
import miradorSharePlugin from 'mirador-share-plugin/es/miradorSharePlugin';
import MiradorDownloadDialog from 'mirador-dl-plugin/es/MiradorDownloadDialog';
import miradorDownloadPlugin from 'mirador-dl-plugin/es/MiradorDownloadPlugin';

@Component({
  selector: 'app-viewer-mirador',
  templateUrl: './viewer-mirador.component.html',
  styleUrls: ['./viewer-mirador.component.scss']
})
export class ViewerMiradorComponent implements OnInit {
  manifestLink = 'https://digital.library.villanova.edu/Item/vudl:24299/Manifest';
  // manifestLink = 'https://purl.stanford.edu/sn904cj3429/iiif/manifest';

  constructor() { }

  ngOnInit(): void {
    this.initMirador();
  }

  initMirador() {
    Mirador.viewer(
      {
        annotation: {
          adapter: (canvasId) => new LocalStorageAdapter(`localStorage://?canvasId=${canvasId}`),
          // adapter: (canvasId) => new AnnototAdapter(canvasId, endpointUrl),
        },
        id: 'mirador',
        mainMenuSettings: {
          show: false
        },
        selectedTheme: 'dark',
        data: [this.manifestLink],
        windows: [{
          manifestId: this.manifestLink,
          imageToolsEnabled: true,
          imageToolsOpen: false
        }],
        miradorSharePlugin: {
          dragAndDropInfoLink: 'https://iiif.io',
          embedOption: {
            enabled: false,
            embedUrlReplacePattern: [
              /.*\.edu\/(\w+)\/iiif\/manifest/,
              this.manifestLink
            ],
            syncIframeDimensions: {
              height: {param: 'maxheight'},
            },
          },
          shareLink: {
            enabled: true,
            manifestIdReplacePattern: [
              /\/iiif\/manifest/,
              '',
            ],
          },
        },
        miradorDownloadPlugin: {
          restrictDownloadOnSizeDefinition: false
        },
        window: {
          loadManifest: this.manifestLink,
          allowClose: false,
          sideBarOpenByDefault: true,
          allowFullscreen: true,
          allowMaximize: false,
          views: [
            {key: 'single'},
            {key: 'book'},
            {key: 'gallery'}
          ],
          sideBarPanel: 'canvas',
        },
        workspace: {
          allowNewWindows: false,
          showZoomControls: true,
          type: 'mosaic'
        },
        workspaceControlPanel: {
          enabled: false
        }
      },
      [
        ...miradorAnnotationPlugin,
        ...miradorImageToolsPlugin,
        miradorShareDialogPlugin,
        miradorSharePlugin,
        // miradorDownloadDialogPlugin,
        // miradorDownloadPlugin,
        MiradorDownloadDialog,
        miradorDownloadPlugin,
      ]
    );
  }

}
