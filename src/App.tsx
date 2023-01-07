import {
  CaretDownFilled,
  DoubleRightOutlined,
  GithubFilled,
  InfoCircleFilled,
  PlusCircleFilled,
  QuestionCircleFilled,
  SearchOutlined,
} from '@ant-design/icons';
import type { ProSettings } from '@ant-design/pro-components';
import {
  PageContainer,
  ProCard,
  ProConfigProvider,
  ProLayout,
  SettingDrawer,
} from '@ant-design/pro-components';
import { css } from '@emotion/css';
import { Button, Divider, Input, Popover, theme } from 'antd';
import React, { useState } from 'react';
import defaultProps from './_defaultProps';

const Item: React.FC<{ children: React.ReactNode }> = (props) => {
  const { token } = theme.useToken();
  return (
    <div
      className={css`
        color: ${token.colorTextSecondary};
        font-size: 14px;
        cursor: pointer;
        line-height: 22px;
        margin-bottom: 8px;
        &:hover {
          color: ${token.colorPrimary};
        }
      `}
      style={{
        width: '33.33%',
      }}
    >
      {props.children}
      <DoubleRightOutlined
        style={{
          marginInlineStart: 4,
        }}
      />
    </div>
  );
};

const List: React.FC<{ title: string; style?: React.CSSProperties }> = (props) => {
  const { token } = theme.useToken();

  return (
    <div
      style={{
        width: '100%',
        ...props.style,
      }}
    >
      <div
        style={{
          fontSize: 16,
          color: token.colorTextHeading,
          lineHeight: '24px',
          fontWeight: 500,
          marginBlockEnd: 16,
        }}
      >
        {props.title}
      </div>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
        }}
      >
        {new Array(2).fill(1).map((_, index) => {
          return <Item key={index}>公有云-{index}</Item>;
        })}
      </div>
    </div>
  );
};

const MenuCard = () => {
  const { token } = theme.useToken();
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Divider
        style={{
          height: '1.5em',
        }}
        type="vertical"
      />
      <Popover
        placement="bottom"
        overlayStyle={{
          width: 'calc(100vw - 24px)',
          padding: '24px',
          paddingTop: 8,
          height: '307px',
          borderRadius: '0 0 6px 6px',
        }}
        content={
          <div style={{ display: 'flex', padding: '32px 40px' }}>
            <div style={{ flex: 1 }}>
              <List title="云解决方案" />
              <List
                title="行业解决方案"
                style={{
                  marginBlockStart: 32,
                }}
              />
            </div>
          </div>
        }
      >
        <div
          style={{
            color: token.colorTextHeading,
            fontWeight: 500,
            cursor: 'pointer',
            display: 'flex',
            gap: 4,
            paddingInlineStart: 8,
            paddingInlineEnd: 12,
            alignItems: 'center',
          }}
          className={css`
            &:hover {
              background-color: ${token.colorBgTextHover};
            }
          `}
        >
          <span>云平台</span>
          <CaretDownFilled />
        </div>
      </Popover>
    </div>
  );
};



function App() {
  const [settings, setSetting] = useState<Partial<ProSettings> | undefined>({
    fixSiderbar: true,
    layout: 'mix',
    splitMenus: true,
  });

  const [pathname, setPathname] = useState('/list/sub-page/sub-sub-page1');
  const [num, setNum] = useState(40);
  return (
    <div
      id="test-pro-layout"
      style={{
        height: '100vh',
      }}
    >
      <ProConfigProvider hashed={false}>
        <ProLayout
          title="云服务圈"
          prefixCls="my-prefix"
          {...defaultProps}
          location={{
            pathname,
          }}
          siderMenuType="group"
          menu={{
            collapsedShowGroupTitle: true,
          }}
          avatarProps={{
            // src: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
            size: 'small',
            title: '云服务圈',
          }}
          // actionsRender={(props) => {
          //   if (props.isMobile) return [];
          //   return [
          //     props.layout !== 'side' && document.body.clientWidth > 1400 ? (
          //       <SearchInput />
          //     ) : undefined,
          //     <InfoCircleFilled key="InfoCircleFilled" />,
          //     <QuestionCircleFilled key="QuestionCircleFilled" />,
          //     <GithubFilled key="GithubFilled" />,
          //   ];
          // }}
          headerTitleRender={(logo, title, _) => {
            const defaultDom = (
              <a>
                {logo}
                {title}
              </a>
            );
            if (document.body.clientWidth < 1400) {
              return defaultDom;
            }
            if (_.isMobile) return defaultDom;
            return (
              <>
                {defaultDom}
                {/* <MenuCard /> */}
              </>
            );
          }}
          menuFooterRender={(props) => {
            if (props?.collapsed) return undefined;
            return (
              <div
                style={{
                  textAlign: 'center',
                  paddingBlockStart: 12,
                }}
              >
                <div>© 2023 heidsoft</div>
                <div>云管理平台</div>
              </div>
            );
          }}
          onMenuHeaderClick={(e) => console.log(e)}
          menuItemRender={(item, dom) => (
            <div
              onClick={() => {
                setPathname(item.path || '/welcome');
              }}
            >
              {dom}
            </div>
          )}
          {...settings}
        >
          <PageContainer
            token={{
              paddingInlinePageContainerContent: num,
            }}
            extra={[
              <Button key="3">操作</Button>,
              <Button key="2">操作</Button>,
              <Button
                key="1"
                type="primary"
                onClick={() => {
                  setNum(num > 0 ? 0 : 40);
                }}
              >
                主操作
              </Button>,
            ]}
            subTitle="简单的描述"
            footer={[
              // <Button key="3">重置</Button>,
              // <Button key="2" type="primary">
              //   提交
              // </Button>,
            ]}
          >
            <ProCard
              style={{
                height: '200vh',
                minHeight: 800,
              }}
            >
              <div />
            </ProCard>
          </PageContainer>

          <SettingDrawer
            pathname={pathname}
            enableDarkTheme
            getContainer={() => document.getElementById('test-pro-layout')}
            settings={settings}
            onSettingChange={(changeSetting) => {
              setSetting(changeSetting);
            }}
            disableUrlParams={false}
          />
        </ProLayout>
      </ProConfigProvider>
    </div>
  );
}

export default App;