<template>
  <div>
    <div class="bg-[#dfe0df] dark:bg-black-100">
      <div class="container mx-auto flex flex-col items-center py-12 sm:py-16">
        <div class="w-11/12 sm:w-2/3 mb-5 sm:mb-10">
          <h1
            class="text-2xl md:text-3xl lg:text-5xl text-center text-black dark:text-slate-300 font-extrabold leading-tight"
          >
            Terms of Use
          </h1>
        </div>
      </div>
    </div>
    <section
      class="container mx-auto max-w-6xl px-4 sm:px-6 py-8 md:py-14 text-black-100 dark:text-slate-300 leading-relaxed"
    >
      <div class="flex mb-6">
        <span class="text-sm p-2 bg-gray-200 dark:bg-gray-800 mr-2 rounded-full"
          >Last updated on 2 December 2019</span
        >
        <span class="text-sm p-2 bg-gray-200 dark:bg-gray-800 rounded-full"
          >19 min read</span
        >
      </div>

      <p class="mb-4 text-sm leading-relaxed">
        Terms of Use apply to the use and visits of this Website as well as
        other services offered. Please, ensure that you read the terms and
        conditions carefully before you check the Website and/or make use of our
        services.
      </p>
      <p class="mb-4 text-sm leading-relaxed">
        If any points are not evident in our Terms of Use, which restricts you
        from accepting the conditions or finding it difficult to read these
        general conditions, don't hesitate to suspend your visit to this
        Website. Present or future visits to this Website and/or the use of our
        services indicates that you accept these Terms of Use entirely.
      </p>
      <p class="mb-6 text-sm leading-relaxed">
        If you want to use Wannahookup.com and the services it requires a
        one-time registration, which allows to User to use a personal password.
      </p>

      <!-- Begin articles -->
      <div class="mb-6">
        <h2 class="text-lg font-medium mb-4">Article 1: Definitions</h2>
        <ul
          v-show="location"
          class="list-decimal list-inside text-sm leading-relaxed"
        >
          <li class="mb-2">
            TRF Networks Co.,Ltd.; The private entity with limited liability,
            with an authorized Trade Register under identification number<span
              v-if="asianUser"
            >
              2912018</span
            >
            <span v-if="!asianUser"> 229625</span>. The business is located in
            <span v-if="asianUser"> Wan Chai, Hong Kong, </span>
            <span v-if="!asianUser"> the Seyschelles, </span>
            in the future to be considered owner, manager and operator of these,
            also known to be “TRF Networks Co.,Ltd.“.
          </li>
          <li class="mb-2">
            Account: The account registered by the User, allows him/her to
            access the Member database/dashboard.
          </li>
          <li class="mb-2">
            Content: The main contents of a website, this content has many
            elements, but it is not limited to photos, films, profiles and
            texts.
          </li>
          <li class="mb-2">
            Credit: The virtual entity within the Member database, allow the
            user to access information in agreement with the provisions of
            Article 7. This also Credits the User to send content and Messages.
          </li>
          <li class="mb-2">
            I.P. rights: All the available intellectual property rights which
            include copyrights, trademark rights, ancillary rights, database
            rights and related rights, i.e. know-how and performances on parity
            with such rights
          </li>
          <li class="mb-2">
            Logging: This is the means of data storage using digital methods of
            events or actions which occurred on WannaHookUp.com
          </li>
          <li class="mb-2">
            Messages: The digital format and shielded means of transferring
            data. It enables User to exchange information with other members of
            the Website, and this procedure is visible to the Account User.
          </li>
          <li class="mb-2">
            Profile: It is a set of individual features and preferences which a
            participant has added to make it available to other users.
          </li>
          <li class="mb-2">
            Service: The Service provided by TRF Networks Co., Ltd., which
            creates a platform to send and receive messages and other tangible
            content to and from other participants.
          </li>
          <li class="mb-2">
            User: A visitor (person/individual), visiting this Website and/or
            using the products or services offered by TRF Networks Co., Ltd.,
            this can also be represented as 'you' or 'your'.
          </li>
          <li class="mb-2">
            Website: An efficient means of presenting or transferring
            information through the Internet.
          </li>
        </ul>
      </div>

      <div class="mb-6">
        <h2 class="text-lg font-medium mb-4">
          Article 2: The SCOPE of Terms and conditions
        </h2>
        <ul class="list-decimal list-inside text-sm leading-relaxed">
          <li class="mb-2">
            These terms and conditions apply to BOTH TRF Networks Co., Ltd. and
            the participant.
          </li>
          <li class="mb-2">
            These terms and conditions apply strictly to the use of
            WannaHookUp.com.
          </li>
          <li class="mb-2">
            Order of materiality: These Terms of Use exist, unless the law of
            Hong Kong, until now as they haven’t been implemented into
            traditional legislation, are compulsory.
          </li>
          <li class="mb-2">
            The occurrence of any provision of these conditions perhaps being
            void or voidable, other provisions will remain in force, and the
            provision proceedings shall be transformed into a valid provision
            which reflects the original intent as closely as possible
          </li>
        </ul>
      </div>

      <div class="mb-6">
        <h2 class="text-lg font-medium mb-4">
          Article 3: Content and the use of WannaHookUp.com
        </h2>
        <ul class="list-decimal list-inside text-sm leading-relaxed">
          <li class="mb-2">
            WannaHookUp.com goal is to great a mutual relationship among users.
            WannaHookUp.com is a platform for users to communicate with each
            other, and it offers a passive connection among the dissemination of
            Profile, Online publication and additional information.
          </li>
          <li class="mb-2">
            The authorized use of WannaHookUp.com and services through
            WannaHookUp.com are open source for people above the minimum age of
            18 years. If you are under 18 years, under the content of
            WannaHookUp.com and/or the use of provided Website or services
            located in a geographical area where the use of offered services and
            access to Website is forbidden, don't hesitate to terminate the
            visit to WannaHookUp.com.
          </li>
          <li class="mb-2">
            After the registration process, the User has the right to set up a
            profile. Users must provide complete and valid information of
            themselves after registration. User permits any changes to this data
            will be transferred directly to WannaHookUp.com or changes made by
            the User on their pages of WannaHookUp.com when required. By
            completing your application, if have access to WannaHookUp.com
            warrant to make use of the intellectual property rights to the
            content offered by User to WannaHookUp.com. This permits the right
            of WannaHookUp.com to display, duplicate, translate, modify, scan,
            accessible for public use, whether commercial or non-commercial,
            sublicense or change of content associated to profiles.
          </li>
          <li class="mb-2">
            Users are restricted from creating a new account for other parties,
            transfer of the account and/or permit others to use previous users
            account. If the user data is for any reason no longer valid or
            complete, the User has to update the data to reaccess the account.
            If the User provides incomplete or inaccurate personal information
            and if TRF Networks Co., Ltd. confirms that the information provided
            is incomplete or incorrect, TRF Networks Co., Ltd. has the right to
            suspend or terminate the account without further investigation.
          </li>
          <li class="mb-2">
            The User is entirely responsible for protecting his username and
            password as a secret. The User is solely liable for the use of the
            account registered by third parties, irrespective of how the access
            to the account is obtained. In case of suspicion action or misuse of
            the account, the User will be notified directly by TRF Networks Co.,
            Ltd.
          </li>
          <li class="mb-2">
            TRF Networks Co., Ltd. will not be held liable for the improper or
            misuse of the account.
          </li>
          <li class="mb-2">
            Gaining illegal access to WannaHookUp.com is a disciplinary offence.
            In the case of suspicions of abuse, TRF Networks Co., Ltd. will
            report any suspected misuse.
          </li>
          <li class="mb-2">
            It is unlawful to duplicate, copy or otherwise use of content
            associated with other Profiles apart from the use of services for
            private and personal purposes
          </li>
          <li class="mb-2">
            It is not acceptable to distribute or comment content which
            trespasses the rights of other users. Also, it is not allowed to
            publish abusive content, violent nature, defamatory, or which can
            cause political racism or violence. Generally, it is not permitted
            to post content which violates the objectives of WannaHookUp.com or
            rules and regulations of decency with the applicable laws.
          </li>
          <li class="mb-2">
            It is not allowed to use or involve WannaHookUp.com in any way
            whatsoever for illegal actions, executing criminal offenses and/or
            for activities which are against general standard and values when
            applicable. This includes other legal acts such as: the violation of
            intellectual property rights of the third parties (this includes,
            trademark rights, copyrights, rights under the Zealand Directive
            96/9 on the legal security of databases, portrait rights, patent
            rights or model rights); the punishable or unlawful distribution of
            texts and/or audio and visual material which includes racist
            statements, (children's) pornography, drug abuse promotion, illegal
            activities and prostitution, criminal data traffic and abusive
            expressions; theft; illicit and/or punishable distribution of
            confidential or secret information; computer hacking ('hacking')
            through the Website; damaging, destroying or rendering useless of
            systems or automated works and software of others; offering access
            through false keys, false capacities and false codes; spreading
            viruses or deliberate disrupting communication or data storage.
          </li>
          <li class="mb-2">
            You should not use the personal information of third parties that
            you possess on WannaHookUp.com, for any purpose, this includes
            transferring of information to third parties or sending mailings to
            people which data you can access through WannaHookUp.com. You affirm
            not to distribute ‘Junk mail’, ‘mailings’, ‘chain letters’, ‘spam’,
            or bulk distribution of email to Users or former Users.
          </li>
          <li class="mb-2">
            It is prohibited to publish people photos apart from your photos on
            WannaHookUp.com. The platform reserves the right to modify, refuse,
            and delete animations or other form of images.
          </li>
          <li class="mb-2">
            It is highly restricted to directly or indirectly add contact
            details which include street addresses, telephone numbers, Surnames,
            email addresses, URLs and other private identifiable information or
            seeking requests to obtain contact information in your profile or on
            visual form. WannaHookUp.com reserves the right to modify, refuse,
            delete Profiles or some information in the Profile section.
          </li>
        </ul>
      </div>

      <div class="mb-6">
        <h2 class="text-lg font-medium mb-4">Article 4: Liability</h2>
        <ul class="list-decimal list-inside text-sm leading-relaxed">
          <li class="mb-2">
            TRF Networks Co., Ltd. work hard to make WannaHookUp.com accessible
            without interruption and to secure it by all means.
          </li>
          <li class="mb-2">
            TRF Networks Co., Ltd. cannot be held responsible in any way for
            interfering with work, issues, interventions, modifications or
            limitation of functionality or other related matters which affect
            the functionality of WannaHookUp.com or other services of TRF
            Networks Co., Ltd..
          </li>
          <li class="mb-2">
            If you assume that your work has been duplicated in a way that
            trespasses copyright or if your intellectual property rights have
            been infringed, please contact us as soon as possible.
          </li>
          <li class="mb-2">
            TRF Networks Co., Ltd. is not liable for the completeness,
            timeliness and exactness if the contents reflect the opinions of the
            User Profiles, advertisements or contribution with different
            motives. Under no circumstances are we responsible for direct or
            indirect damage which results from the use of WannaHookUp.com. In
            regards to this, we exclude every liability to the extent authorized
            by law, regardless of the action or disregard for other Users.
          </li>
        </ul>
      </div>

      <div class="mb-6">
        <h2 class="text-lg font-medium mb-4">Article 5: Content</h2>
        <ul class="list-decimal list-inside text-sm leading-relaxed">
          <li class="mb-2">
            The contents in the external links available within our network are
            not controlled by us; this implies that the respective provider is
            liable. The content of WannaHookUp.com has been complied with
            relevant information and utmost care. TRF Networks Co., Ltd. is not
            responsible for the topicality, correctness, completeness of the
            information available. The impacts reflect the opinion of the author
            in regards to the profiles, characters, contribution and
            advertisements which can be a personal motive. Physical contacts are
            restricted in all circumstances, we are not liable for any direct or
            indirect damage which results from the use of WannaHookUp.com, and
            in any case we exclude every liability to the extent authorized by
            law, regardless of the action or disregard of Users.
          </li>
          <li class="mb-2">
            WannaHookUp.com maintain a definite goal, it is clearly not the
            purpose of WannaHookUp.com to fix meetings or dates in person.
          </li>
          <li class="mb-2">
            TRF Networks Co., Ltd. clearly reserves the right to communicate
            with WannaHookUp.com in regards to self-created profiles. These are
            fictional profiles where physical bonds are not available.
          </li>
          <li class="mb-2">
            TRF Networks Co., Ltd. is not responsible for Profiles that violate
            the law. TRF Networks Co., Ltd. does not have the means to
            permanently check the content of Profiles. If a violation of the law
            is suspected by a User, TRF Networks Co., Ltd. will be notified
            immediately. TRF Networks Co., Ltd. will then make every possible
            effort to prevent a repetition of this and, if necessary, remove any
            statements on the Website.
          </li>
          <li class="mb-2">
            TRF Networks Co., Ltd. make use of third-party websites to contact
            visitors on their Website, whether or not free of charge. These
            third parties are responsible for placing the hyperlinks for the
            website content by themselves, in such a way that this third part
            can transfer User to WannaHookUp.com via the hyperlinks.
          </li>
          <li class="mb-2">
            User grants TRF Networks Co., Ltd. is an authorized license with
            intellectual property rights on the content offered by the User.
            This permission specially includes the right of TRF Networks Co.,
            Ltd. to modify, scan, display, duplicate, for publicity purposes,
            for commercial and non-commercial use, sublicense or transfer of
            content associated with Profiles (video images, search criteria,
            information, descriptions and photos etc.)
          </li>
        </ul>
      </div>

      <div class="mb-6">
        <h2 class="text-lg font-medium mb-4">
          Article 6: Control Use, Privacy and Personal data
        </h2>
        <ul class="list-decimal list-inside text-sm leading-relaxed">
          <li class="mb-2">
            TRF Networks Co., Ltd. maintains strict protection of personal data
            of users accessing the WannaHookUp.com. For more information, you
            can check the privacy statement on WannaHookUp.com.
          </li>
          <li class="mb-2">
            The information of the User is logged during the visit to
            WannaHookUp.com and/or use of the services. This information is
            important for the proper functioning of WannaHookUp.com and
            improvement/optimization of WannaHookUp.com and/or other services
            offered by TRF Networks Co., Ltd. This available data can also be
            used to check for errors and/or violations of these terms and
            conditions, legal provisions or other information required by TRF
            Networks Co., Ltd.
          </li>
          <li class="mb-2">
            TRF Networks Co., Ltd. carefully consider the protection of this
            information and will not share this information with third parties.
          </li>
          <li class="mb-2">
            In case of defilement of the provisions in these Terms of Use,
            actions which are against the law and/or in case of fraudulent
            actions with immediate effect without prior warning blocked and the
            membership will be terminated. In this situation, the purchased
            balance will be irrevocably and instantly cancelled. The costs
            related with tracing the fraud or abuse are recovered from the User.
            This is with no prejudice to the legal right of TRF Networks Co.,
            Ltd. to recover from the damages caused and legal as well as
            non-judicial costs incurred by the User.
          </li>
        </ul>
      </div>

      <div class="mb-6">
        <h2 class="text-lg font-medium mb-4">
          Article 7: Payment procurement and Rates
        </h2>
        <ul class="list-decimal list-inside text-sm leading-relaxed">
          <li class="mb-2">
            User is liable to pay the price due for the Service, by the process
            of acquiring credits directly from the User via bank transfer or
            credit card payment. The current rates are inclusive of VAT and
            other government charges.
          </li>
          <li class="mb-2">
            In case of a dispute, the data of TRF Networks Co., Ltd. serves as
            key measures to determine the amounts due, expect the Client proves
            that this information is invalid.
          </li>
          <li class="mb-2">
            Credits purchased by the User have a limited validity period, after
            which they expire if a User is inactive form more than 3 months on
            WannaHookUp.com, then the account of the User will be removed.
            Before deleting the account, all data such as Winks, Messages and
            outstanding credit balances are automatically removed from the
            system. The User can no longer claim an exceptional credit.
          </li>
          <li class="mb-2">
            If the User delete his/her account, the User might also remove the
            available credit balance. Then, the User can no longer access any
            outstanding Credits at this point.
          </li>
          <li class="mb-2">
            Credits issued by the User due to an error (technical fault) will
            not be refunded. In the event of a (technical) failure at TRF
            Networks Co., Ltd., the User has the right to write a request for
            refund caused by a system failure. In such a case, refunds will not
            be granted on unreasonable grounds.
          </li>
          <li class="mb-2">
            The User consent to deliver Credits by TRF Networks Co.,Ltd. will be
            granted without hesitation after payment by the User. Credits are
            not redeemable for money.
          </li>
          <li class="mb-2">
            When the User makes a credit card chargeback with no valid reason,
            all extra costs related with this chargeback will be charged to the
            User directly.
          </li>
        </ul>
      </div>

      <div class="mb-6">
        <h2 class="text-lg font-medium mb-4">Article 8: Reflection period</h2>
        <ul class="list-decimal list-inside text-sm leading-relaxed">
          <li class="mb-2">
            The legal cooling-off period of article 7: 46c paragraph 1 under
            Zealand Civil Code doesn't apply to this Service.
          </li>
          <li class="mb-2">
            TRF Networks Co., Ltd. provides digital services which are entitled
            to termination within 14 days. If the user makes use of the
            purchased services within these 14 days, the right of return will
            lapse (during this period). The refunds will be granted within 14
            days after payment of the User. If this is not feasible, for
            instance a telephone confirmation can allow the User to access a
            bank account. The withdrawal period expires 14 days after the day.
            <br />
            <br />
            To execute the right of withdrawal, you need to send us a detailed
            statement (for instance writing by fax, mail or email
            billing@WannaHookUp.com) to provide more insight on your decision to
            revoke the agreement.
          </li>
        </ul>
      </div>

      <div class="mb-6">
        <h2 class="text-lg font-medium mb-4">
          Article 9: Managing criticism/complaints
        </h2>
        <ul class="list-decimal list-inside text-sm leading-relaxed">
          <li class="mb-2">
            TRF Networks Co., Ltd. will diligently consider all the complaints
            in regards to the Website, quality or criticisms of any form.
          </li>
          <li class="mb-2">
            The User should file a complaint in writing by sending an email to
            TRF Networks Co., Ltd.
          </li>
          <li class="mb-2">
            TRF Networks Co., Ltd. must ensure to resolve complaints within 7
            working days. In addition, TRF Networks Co., Ltd. will notify the
            User in writing through email messages.
          </li>
        </ul>
      </div>

      <div class="mb-6">
        <h2 class="text-lg font-medium mb-4">Article 10: User disputes</h2>
        <ul class="list-decimal list-inside text-sm leading-relaxed">
          <li class="mb-2">
            Because WannaHookUp.com is not and will not be involved in
            communication between Users, if there is any disagreement with
            another User, then you are hereby release by WannaHookUp.com from
            all claims and damages (direct or indirect) in any nature or form,
            known and unknown, disclosed or not disclosed, suspected and
            unsuspected due to or connect with such cases.
          </li>
        </ul>
      </div>

      <div class="mb-6">
        <h2 class="text-lg font-medium mb-4">
          Article 11: Intellectual property
        </h2>
        <ul class="list-decimal list-inside text-sm leading-relaxed">
          <li class="mb-2">
            Every intellectual property rights and similar rights in all
            services, products and information provided on WannaHookUp.com are
            conferred solely in TRF Networks Co., Ltd. or its licensors.
          </li>
          <li class="mb-2">
            Any/no part of WannaHookUp.com must not be reproduced without
            written permission from TRF Networks Co., Ltd. The intellectual
            property rights to every images, texts, sounds and software of
            WannaHookUp.com belong to TRF Networks Co., Ltd. or its licensors.
          </li>
          <li class="mb-2">
            Users has the right to share images, texts, sound and/or software to
            TRF Networks Co., Ltd. or keep them on the Website, users transfer
            of intellectual property rights to TRF Networks Co., Ltd. and
            protect TRF Networks Co., Ltd. via third-party claims. TRF Networks
            Co., Ltd. is also entitled to access these contributions
            commercially.
          </li>
          <li class="mb-2">
            In case the TRF Networks Co., Ltd. be informed of (alleged)
            infringing links or (alleged) infringing material on the Website,
            then TRF Networks Co., Ltd. has the right, but no obligation to
            delete the content or links.
          </li>
        </ul>
      </div>

      <div>
        <h2 class="text-lg font-medium mb-4">
          Article 12: Changes in price and Amendment in general conditions
        </h2>
        <ul class="list-decimal list-inside text-sm leading-relaxed">
          <li class="mb-2">
            TRF Networks Co., Ltd. has the right to change the prices and
            services published on its Website at any time, also they can adjust
            the terms and conditions, update them or improve the activities. It
            is your sole responsibility to check these terms and conditions
            regularly. If you continue to use WannaHookUp.com after updates or
            changes, this shows that you agree with these changes.
          </li>
          <li class="mb-2">
            TRF Networks Co., Ltd. is not liable for any adverse consequences
            which may result from changes made to the content on WannaHookUp.com
            or the terms and conditions
          </li>
        </ul>
      </div>
      <!-- End articles -->
    </section>
  </div>
</template>
<script>
export default {
  data() {
    return {
      location: null,
      countryCodes: [
        'AF',
        'BG',
        'BX',
        'CB',
        'CH',
        'GZ',
        'II',
        'IR',
        'IY',
        'JA',
        'KN',
        'KU',
        'LE',
        'MY',
        'NP',
        'PK',
        'PF',
        'QA',
        'SI',
        'CE',
        'TH',
        'TS',
        'WJ',
        'YS',
        'BA',
        'BT',
        'BR',
        'CC',
        'CY',
        'HK',
        'IO',
        'IQ',
        'IS',
        'JO',
        'KO',
        'LS',
        'MH',
        'MP',
        'MK',
        'PP',
        'PH',
        'SU',
        'XP',
        'SY',
        'TU',
        'VM',
        'YE',
      ],
      asianUser: false,
    }
  },
  head() {
    return {
      title: this.$t('pages.terms'),
    }
  },

  mounted() {
    this.getUserLocation()
  },

  methods: {
    getUserLocation() {
      this.$axios('/user/location').then(({ data }) => {
        this.location = data.data.location
        this.asianUser = this.countryCodes.includes(this.location.countryCode)
      })
    },
  },
}
</script>
