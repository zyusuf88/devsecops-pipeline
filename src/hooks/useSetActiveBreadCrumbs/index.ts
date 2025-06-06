/** *******************************************************************************************************************
  Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.

  Licensed under the Apache License, Version 2.0 (the "License").
  You may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
 ******************************************************************************************************************** */
import { BreadcrumbGroupProps } from '@cloudscape-design/components';
import { useEffect } from 'react';
import { useWorkspacesContext } from '../../contexts';
import { useAppLayoutContext } from '../../components/FullAppLayout';

const useSetActiveBreadcrumbGroup = (additionPaths?: BreadcrumbGroupProps.Item[]) => {
  const { setActiveBreadcrumbs } = useAppLayoutContext();
  const { currentWorkspace } = useWorkspacesContext();
  useEffect(() => {
    const currentPath = window.location.pathname + window.location.search;
    setActiveBreadcrumbs([
      {
        href: currentPath,
        text: 'dashboard',
      },
      {
        href: currentPath,
        text: 'workspaces',
      },
      {
        href: currentPath,
        text: currentWorkspace?.name || 'default',
      },
      ...additionPaths?.map(a => ({
        ...a,
        href: currentPath + a.href,
      })) || [],
    ]);
  }, [setActiveBreadcrumbs, currentWorkspace]);
};

export default useSetActiveBreadcrumbGroup;
