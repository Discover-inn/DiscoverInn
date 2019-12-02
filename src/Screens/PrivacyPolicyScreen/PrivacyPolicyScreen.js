import React, {Fragment} from 'react';
import {
  View,
  Text,
  Dimensions,
  Image,
  TextInput,
  SafeAreaView,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {ListItem, CheckBox, Picker, Textarea} from 'native-base';
import Icon from 'react-native-vector-icons/Feather';
import Header from '../../components/header/header';
import styles from './PrivacyPolicyScreen.style';

class PrivacyPolicyScreen extends React.Component {
  render() {
    return (
      <Fragment>
        <Header
          showBack={true}
          title={''}
          {...this.props}
          style={styles.bgTransparent}
        />
        <ScrollView style={styles.container}>
          <View style={styles.PrivacyTitle}>
            <View style={styles.PrivacyTitleLine}></View>
            <Text style={styles.PrivacyTitleText}>Privacy Policy</Text>
          </View>
          <View style={styles.PrivacyCard}>
            <Text style={styles.PrivacyCardText}>
              This privacy policy ("Policy") describes how Website Operator
              ("Website Operator", "we", "us" or "our") collects, protects and
              uses the personally identifiable information ("Personal
              Information") you ("User", "you" or "your") may provide on the
              discover-inn.com website and any of its products or services
              (collectively, "Website" or "Services"). It also describes the
              choices available to you regarding our use of your Personal
              Information and how you can access and update this information.
              This Policy does not apply to the practices of companies that we
              do not own or control, or to individuals that we do not employ or
              manage.
            </Text>
          </View>
          <View style={styles.PrivacyContent}>
            <Text style={styles.PrivacyContentTitle}>
              Collection of personal information
            </Text>
            <Text style={styles.PrivacyCardText}>
              We receive and store any information you knowingly provide to us
              when you create an account, publish content, fill any online forms
              on the Website. When required this information may include your
              email address, name, or other Personal Information. You can choose
              not to provide us with certain information, but then you may not
              be able to take advantage of some of the Website's features. Users
              who are uncertain about what information is mandatory are welcome
              to contact us.
            </Text>
            <Text style={styles.PrivacyContentTitle}>
              Collection of non-personal information
            </Text>
            <Text style={styles.PrivacyCardText}>
              When you visit the Website our servers automatically record
              information that your browser sends. This data may include
              information such as your device's IP address, browser type and
              version, operating system type and version, language preferences
              or the webpage you were visiting before you came to our Website,
              pages of our Website that you visit, the time spent on those
              pages, information you search for on our Website, access times and
              dates, and other statistics.
            </Text>
            <Text style={styles.PrivacyContentTitle}>
              Managing personal information
            </Text>
            <Text style={styles.PrivacyCardText}>
              You are able to access, add to, update and delete certain Personal
              Information about you. The information you can view, update, and
              delete may change as the Website or Services change. When you
              update information, however, we may maintain a copy of the
              unrevised information in our records. Some information may remain
              in our private records after your deletion of such information
              from your account. We will retain and use your information as
              necessary to comply with our legal obligations, resolve disputes,
              and enforce our agreements. We may use any aggregated data derived
              from or incorporating your Personal Information after you update
              or delete it, but not in a manner that would identify you
              personally. Once the retention period expires, Personal
              Information shall be deleted. Therefore, the right to access, the
              right to erasure, the right to rectification and the right to data
              portability cannot be enforced after the expiration of the
              retention period.
            </Text>
            <Text style={styles.PrivacyContentTitle}>
              Use and processing of collected information
            </Text>
            <Text style={styles.PrivacyCardText}>
              Any of the information we collect from you may be used to
              personalize your experience; improve our Website; run and operate
              our Website and Services. Non-Personal Information collected is
              used only to identify potential cases of abuse and establish
              statistical information regarding Website usage. This statistical
              information is not otherwise aggregated in such a way that would
              identify any particular user of the system.
            </Text>
            <Text style={styles.PrivacyCardText}>
              We may process Personal Information related to you if one of the
              following applies: (i) You have given your consent for one or more
              specific purposes. Note that under some legislations we may be
              allowed to process information until you object to such processing
              (by opting out), without having to rely on consent or any other of
              the following legal bases below. This, however, does not apply,
              whenever the processing of Personal Information is subject to
              European data protection law; (ii) Provision of information is
              necessary for the performance of an agreement with you and/or for
              any pre-contractual obligations thereof; (ii) Processing is
              necessary for compliance with a legal obligation to which you are
              subject; (iv) Processing is related to a task that is carried out
              in the public interest or in the exercise of official authority
              vested in us; (v) Processing is necessary for the purposes of the
              legitimate interests pursued by us or by a third party. In any
              case, we will be happy to clarify the specific legal basis that
              applies to the processing, and in particular whether the provision
              of Personal Data is a statutory or contractual requirement, or a
              requirement necessary to enter into a contract.
            </Text>
            <Text style={styles.PrivacyContentTitle}>
              Information transfer and storage
            </Text>
            <Text style={styles.PrivacyCardText}>
              Depending on your location, data transfers may involve
              transferring and storing your information in a country other than
              your own. You are entitled to learn about the legal basis of
              information transfers to a country outside the European Union or
              to any international organization governed by public international
              law or set up by two or more countries, such as the UN, and about
              the security measures taken by us to safeguard your information.
              If any such transfer takes place, you can find out more by
              checking the relevant sections of this document or inquire with us
              using the information provided in the contact section.
            </Text>
            <Text style={styles.PrivacyContentTitle}>The rights of users</Text>
            <Text style={styles.PrivacyCardText}>
              You may exercise certain rights regarding your information
              processed by us. In particular, you have the right to do the
              following: (i) you have the right to withdraw consent where you
              have previously given your consent to the processing of your
              information; (ii) you have the right to object to the processing
              of your information if the processing is carried out on a legal
              basis other than consent; (iii) you have the right to learn if
              information is being processed by us, obtain disclosure regarding
              certain aspects of the processing and obtain a copy of the
              information undergoing processing; (iv) you have the right to
              verify the accuracy of your information and ask for it to be
              updated or corrected; (v) you have the right, under certain
              circumstances, to restrict the processing of your information, in
              which case, we will not process your information for any purpose
              other than storing it; (vi) you have the right, under certain
              circumstances, to obtain the erasure of your Personal Information
              from us; (vii) you have the right to receive your information in a
              structured, commonly used and machine readable format and, if
              technically feasible, to have it transmitted to another controller
              without any hindrance. This provision is applicable provided that
              your information is processed by automated means and that the
              processing is based on your consent, on a contract which you are
              part of or on pre-contractual obligations thereof.
            </Text>
            <Text style={styles.PrivacyContentTitle}>
              The right to object to processing
            </Text>
            <Text style={styles.PrivacyCardText}>
              Where Personal Information is processed for the public interest,
              in the exercise of an official authority vested in us or for the
              purposes of the legitimate interests pursued by us, you may object
              to such processing by providing a ground related to your
              particular situation to justify the objection. You must know that,
              however, should your Personal Information be processed for direct
              marketing purposes, you can object to that processing at any time
              without providing any justification. To learn, whether we are
              processing Personal Information for direct marketing purposes, you
              may refer to the relevant sections of this document.
            </Text>
            <Text style={styles.PrivacyContentTitle}>
              How to exercise these rights
            </Text>
            <Text style={styles.PrivacyCardText}>
              Any requests to exercise User rights can be directed to the Owner
              through the contact details provided in this document. These
              requests can be exercised free of charge and will be addressed by
              the Owner as early as possible and always within one month.
            </Text>
            <Text style={styles.PrivacyContentTitle}>Privacy of children</Text>
            <Text style={styles.PrivacyCardText}>
              We do not knowingly collect any Personal Information from children
              under the age of 13. If you are under the age of 13, please do not
              submit any Personal Information through our Website or Service. We
              encourage parents and legal guardians to monitor their children's
              Internet usage and to help enforce this Policy by instructing
              their children never to provide Personal Information through our
              Website or Service without their permission. If you have reason to
              believe that a child under the age of 13 has provided Personal
              Information to us through our Website or Service, please contact
              us. You must also be at least 16 years of age to consent to the
              processing of your personal data in your country (in some
              countries we may allow your parent or guardian to do so on your
              behalf).
            </Text>
            <Text style={styles.PrivacyContentTitle}>Do Not Track signals</Text>
            <Text style={styles.PrivacyCardText}>
              Some browsers incorporate a Do Not Track feature that signals to
              websites you visit that you do not want to have your online
              activity tracked. Tracking is not the same as using or collecting
              information in connection with a website. For these purposes,
              tracking refers to collecting personally identifiable information
              from consumers who use or visit a website or online service as
              they move across different websites over time. How browsers
              communicate the Do Not Track signal is not yet uniform. As a
              result, this Website is not yet set up to interpret or respond to
              Do Not Track signals communicated by your browser. Even so, as
              described in more detail throughout this Policy, we limit our use
              and collection of your personal information.
            </Text>
            <Text style={styles.PrivacyContentTitle}>
              Links to other websites
            </Text>
            <Text style={styles.PrivacyCardText}>
              Our Website contains links to other websites that are not owned or
              controlled by us. Please be aware that we are not responsible for
              the privacy practices of such other websites or third-parties. We
              encourage you to be aware when you leave our Website and to read
              the privacy statements of each and every website that may collect
              Personal Information.
            </Text>
            <Text style={styles.PrivacyContentTitle}>Information security</Text>
            <Text style={styles.PrivacyCardText}>
              We secure information you provide on computer servers in a
              controlled, secure environment, protected from unauthorized
              access, use, or disclosure. We maintain reasonable administrative,
              technical, and physical safeguards in an effort to protect against
              unauthorized access, use, modification, and disclosure of Personal
              Information in its control and custody. However, no data
              transmission over the Internet or wireless network can be
              guaranteed. Therefore, while we strive to protect your Personal
              Information, you acknowledge that (i) there are security and
              privacy limitations of the Internet which are beyond our control;
              (ii) the security, integrity, and privacy of any and all
              information and data exchanged between you and our Website cannot
              be guaranteed; and (iii) any such information and data may be
              viewed or tampered with in transit by a third-party, despite best
              efforts.
            </Text>
            <Text style={styles.PrivacyContentTitle}>Data breach</Text>
            <Text style={styles.PrivacyCardText}>
              In the event we become aware that the security of the Website has
              been compromised or users Personal Information has been disclosed
              to unrelated third parties as a result of external activity,
              including, but not limited to, security attacks or fraud, we
              reserve the right to take reasonably appropriate measures,
              including, but not limited to, investigation and reporting, as
              well as notification to and cooperation with law enforcement
              authorities. In the event of a data breach, we will make
              reasonable efforts to notify affected individuals if we believe
              that there is a reasonable risk of harm to the user as a result of
              the breach or if notice is otherwise required by law. When we do,
              we will post a notice on the Website, send you an email.
            </Text>
            <Text style={styles.PrivacyContentTitle}>Legal disclosure</Text>
            <Text style={styles.PrivacyCardText}>
              We will disclose any information we collect, use or receive if
              required or permitted by law, such as to comply with a subpoena,
              or similar legal process, and when we believe in good faith that
              disclosure is necessary to protect our rights, protect your safety
              or the safety of others, investigate fraud, or respond to a
              government request. In the event we go through a business
              transition, such as a merger or acquisition by another company, or
              sale of all or a portion of its assets, your user account, and
              personal data will likely be among the assets transferred.
            </Text>
            <Text style={styles.PrivacyContentTitle}>
              Changes and amendments
            </Text>
            <Text style={styles.PrivacyCardText}>
              We reserve the right to modify this Policy relating to the Website
              or Services at any time, effective upon posting of an updated
              version of this Policy on the Website. When we do we will revise
              the updated date at the bottom of this page. Continued use of the
              Website after any such changes shall constitute your consent to
              such changes. Policy was created with WebsitePolicies.
            </Text>
            <Text style={styles.PrivacyContentTitle}>
              Acceptance of this policy
            </Text>
            <Text style={styles.PrivacyCardText}>
              You acknowledge that you have read this Policy and agree to all
              its terms and conditions. By using the Website or its Services you
              agree to be bound by this Policy. If you do not agree to abide by
              the terms of this Policy, you are not authorized to use or access
              the Website and its Services.
            </Text>
            <Text style={styles.PrivacyContentTitle}>Contacting us</Text>
            <Text style={styles.PrivacyCardText}>
              If you have any questions about this Agreement, please contact us.
            </Text>
            <Text style={styles.PrivacyCardText}>
              This document was last updated on April 29, 2019
            </Text>
          </View>
        </ScrollView>
      </Fragment>
    );
  }
}
export default PrivacyPolicyScreen;
