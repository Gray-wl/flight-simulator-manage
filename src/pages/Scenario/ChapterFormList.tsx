import classNames from 'classnames';
import { Form, Select, Input, Button } from 'antd';
import {
  CloseCircleOutlined,
  CloseCircleTwoTone,
  PlusOutlined,
} from '@ant-design/icons';
// import EditDataFormList from '@/components/EditDataFormList';

const ChapterFormList = () => {
  return (
    <Form.List name="chapterList" initialValue={[{ chapterContentList: [{}] }]}>
      {(chapterFields, { add: addChapter, remove: removeChapter }) => (
        <Form.Item label="章节内容">
          <Button
            type="link"
            onClick={() => addChapter({ chapterContentList: [{}] })}
            icon={<PlusOutlined />}
          >
            新增章节
          </Button>
          {chapterFields.map((chapterField, chapterIndex) => (
            <div
              key={chapterField.key}
              className={classNames('w-[100%]', {
                'mt-[30px]': !!chapterIndex,
              })}
            >
              <Form.List name={[chapterField.name, 'chapterContentList']}>
                {(
                  contentFields,
                  { add: addContent, remove: removeContent },
                ) => (
                  <Form.Item label={`章节${chapterIndex + 1}`}>
                    <div className="flex justify-between mb-[10px]">
                      <Button
                        type="link"
                        onClick={addContent}
                        icon={<PlusOutlined />}
                      >
                        新增内容
                      </Button>
                      <Form.Item
                        className="w-[50%] mb-0"
                        label="判断方式"
                        name={[chapterField.name, 'judgeCode']}
                        rules={[{ required: true, message: '请选择判断方式' }]}
                      >
                        <Select placeholder="请选择判断方式" options={[{ label: '121', value: '333' }]} />
                      </Form.Item>
                      {chapterFields.length > 1 && (
                        <CloseCircleTwoTone
                          className="dynamic-delete-button pr-[5px] pl-[10px] text-[16px]"
                          onClick={() => removeChapter(chapterField.name)}
                        />
                      )}
                    </div>
                    {contentFields.map((contentField, contentIndex) => (
                      <div
                        key={contentField.key}
                        className={classNames({
                          'mt-[30px]': !!contentIndex,
                        })}
                      >
                        {contentFields.length > 1 && (
                          <div className="flex items-start justify-between">
                            {/* <EditDataFormList
                              label={`条件${contentIndex + 1}`}
                              name={[contentField.name, 'attributeList']}
                              addBtnText="添加条件"
                              initialValue={[{}]}
                            /> */}
                            <Form.Item
                              className="flex-1"
                              label={`选项${contentIndex + 1}`}
                              name={[contentField.name, 'selection']}
                              rules={[
                                { required: true, message: '请输入选项' },
                              ]}
                            >
                              <Input placeholder="请输入选项" maxLength={200} />
                            </Form.Item>
                            <CloseCircleOutlined
                              className="dynamic-delete-button pt-[8px] pr-[5px] pl-[10px] text-[16px]"
                              onClick={() => removeContent(contentField.name)}
                            />
                          </div>
                        )}
                        <Form.Item
                          className={classNames({
                            'mt-[10px]': contentFields.length > 1,
                          })}
                          label={`章节内容${contentIndex + 1}`}
                          name={[contentField.name, 'chapterContent']}
                          rules={[
                            { required: true, message: '请输入章节内容' },
                          ]}
                        >
                          <Input.TextArea
                            placeholder="请输入章节内容"
                            maxLength={1000}
                            showCount
                          />
                        </Form.Item>
                      </div>
                    ))}
                  </Form.Item>
                )}
              </Form.List>
            </div>
          ))}
        </Form.Item>
      )}
    </Form.List>
  );
};

export default ChapterFormList;
