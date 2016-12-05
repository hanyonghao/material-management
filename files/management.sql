/*
Navicat MySQL Data Transfer

Source Server         : 本地
Source Server Version : 50520
Source Host           : localhost:3306
Source Database       : management

Target Server Type    : MYSQL
Target Server Version : 50520
File Encoding         : 65001

Date: 2016-11-06 15:01:33
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for administrator
-- ----------------------------
DROP TABLE IF EXISTS `administrator`;
CREATE TABLE `administrator` (
  `id` varchar(32) NOT NULL COMMENT '编号',
  `name` varchar(32) DEFAULT NULL COMMENT '用户名',
  `password` varchar(32) DEFAULT NULL COMMENT '密码',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='管理员表';

-- ----------------------------
-- Records of administrator
-- ----------------------------
INSERT INTO `administrator` VALUES ('1000', 'admin', '123');

-- ----------------------------
-- Table structure for apply_sheet
-- ----------------------------
DROP TABLE IF EXISTS `apply_sheet`;
CREATE TABLE `apply_sheet` (
  `id` varchar(32) NOT NULL COMMENT '编号',
  `ap_activity` varchar(32) DEFAULT NULL COMMENT '活动名',
  `ap_approver` varchar(32) DEFAULT NULL COMMENT '申请人',
  `ap_clazz` varchar(32) DEFAULT NULL COMMENT '部门',
  `ap_phone` int(11) DEFAULT NULL COMMENT '联系方式',
  `ap_lend` date DEFAULT NULL COMMENT '借出日期',
  `ap_return` date DEFAULT NULL COMMENT '归还日期',
  `ap_create` date DEFAULT NULL COMMENT '申请日期',
  `ap_status` varchar(32) DEFAULT NULL COMMENT '状态',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='物资申请表';

-- ----------------------------
-- Records of apply_sheet
-- ----------------------------
INSERT INTO `apply_sheet` VALUES ('2e4a9eb1e133a252152a7142405a81b2', '歌唱比赛', '啊奥', '文娱部', '123123', '2016-11-06', '2016-11-15', '2016-11-05', '未借出');
INSERT INTO `apply_sheet` VALUES ('381b501f1133a252151970958b07a05c', '演讲比赛', '哈哈哈', '学习部', '123132123', '2016-11-07', '2016-11-09', '2016-11-05', '借出中');
INSERT INTO `apply_sheet` VALUES ('4b5d5a489133a24cce9e1447232ac8c2', '创业比赛', '哇哇哇', '学习部', '123123123', '2016-11-03', '2016-11-10', '2016-11-06', '待审批');
INSERT INTO `apply_sheet` VALUES ('50aa0e167133a252151b98c348b654e5', '部门会议', '啊啊啊', '学习部', '1312312', '2016-11-04', '2016-11-07', '2016-11-02', '待审批');
INSERT INTO `apply_sheet` VALUES ('7a8ff6447133a25216036896d9df524c', '书法比赛', '啊哈哈', '学习部', '1231312223', '2016-11-11', '2016-11-15', '2016-11-05', '已完成');
INSERT INTO `apply_sheet` VALUES ('7c3b66c77133a25215028dbb78fc34e7', '辩论赛', '哈哈哈', '学习部', '123123123', '2016-11-01', '2016-11-03', '2016-11-01', '已关闭');

-- ----------------------------
-- Table structure for department
-- ----------------------------
DROP TABLE IF EXISTS `department`;
CREATE TABLE `department` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '编号',
  `name` varchar(255) DEFAULT NULL COMMENT '名称',
  `password` varchar(255) DEFAULT NULL COMMENT '密码',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=utf8 COMMENT='部门表';

-- ----------------------------
-- Records of department
-- ----------------------------
INSERT INTO `department` VALUES ('100', 'lpl', '123');

-- ----------------------------
-- Table structure for material_sheet
-- ----------------------------
DROP TABLE IF EXISTS `material_sheet`;
CREATE TABLE `material_sheet` (
  `id` varchar(32) NOT NULL COMMENT '编号',
  `m_name` varchar(255) DEFAULT NULL COMMENT '名称',
  `m_amount` int(11) DEFAULT NULL COMMENT '库存',
  `m_unit` varchar(255) DEFAULT NULL COMMENT '单位',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='物资表';

-- ----------------------------
-- Records of material_sheet
-- ----------------------------
INSERT INTO `material_sheet` VALUES ('101', '直尺', '20', '把');
INSERT INTO `material_sheet` VALUES ('102', '钢笔', '30', '支');
INSERT INTO `material_sheet` VALUES ('103', '透明胶', '10', '卷');
INSERT INTO `material_sheet` VALUES ('104', '卡套', '8', '个');
INSERT INTO `material_sheet` VALUES ('105', '彩带', '15', '卷');
INSERT INTO `material_sheet` VALUES ('106', '卡纸', '18', '张');
INSERT INTO `material_sheet` VALUES ('108', '剪刀', '5', '把');
INSERT INTO `material_sheet` VALUES ('2147483647', '桌子', '1', '张');
INSERT INTO `material_sheet` VALUES ('5240', '凳子', '3', '张');

-- ----------------------------
-- Table structure for record_sheet
-- ----------------------------
DROP TABLE IF EXISTS `record_sheet`;
CREATE TABLE `record_sheet` (
  `id` varchar(32) NOT NULL COMMENT '编号',
  `m_id` varchar(32) DEFAULT NULL COMMENT '物资编号',
  `ap_id` varchar(32) DEFAULT NULL COMMENT '申请编号',
  `r_count` int(11) DEFAULT NULL COMMENT '借用数量',
  `r_remark` varchar(32) DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='借出登记表';

-- ----------------------------
-- Records of record_sheet
-- ----------------------------
INSERT INTO `record_sheet` VALUES ('099e64e43133a2521519710dbab1601e', '105', '381b501f1133a252151970958b07a05c', '3', '');
INSERT INTO `record_sheet` VALUES ('40a5fb022133a252152a71c7ad41cd44', '103', '2e4a9eb1e133a252152a7142405a81b2', '1', '');
INSERT INTO `record_sheet` VALUES ('562ccd89a133a25215028e51851e75f2', '104', '7c3b66c77133a25215028dbb78fc34e7', '3', '无');
INSERT INTO `record_sheet` VALUES ('5d50c32ab133a252151971036491ece1', '101', '381b501f1133a252151970958b07a05c', '1', '');
INSERT INTO `record_sheet` VALUES ('6f3c991a1133a252151b994e4ba1b62a', '102', '50aa0e167133a252151b98c348b654e5', '2', '');
INSERT INTO `record_sheet` VALUES ('862ae060c133a25215028e5bc5c55059', '102', '7c3b66c77133a25215028dbb78fc34e7', '2', '无');
INSERT INTO `record_sheet` VALUES ('a42da3831133a24cce9e1db48bfd7e3e', '101', '4b5d5a489133a24cce9e1447232ac8c2', '1', '');
INSERT INTO `record_sheet` VALUES ('cd87fa4b1133a252152a71cbb93a0eeb', '102', '2e4a9eb1e133a252152a7142405a81b2', '1', '');
INSERT INTO `record_sheet` VALUES ('d699e1fd5133a2521603693eb099c0b9', '102', '7a8ff6447133a25216036896d9df524c', '3', '');
INSERT INTO `record_sheet` VALUES ('da41d3611133a25215197105ec9bc63d', '103', '381b501f1133a252151970958b07a05c', '2', '');
INSERT INTO `record_sheet` VALUES ('f6425210d133a25215028e575342451a', '101', '7c3b66c77133a25215028dbb78fc34e7', '1', '无');
INSERT INTO `record_sheet` VALUES ('fde477019133a25216036934bdc60bcc', '105', '7a8ff6447133a25216036896d9df524c', '1', '1');
